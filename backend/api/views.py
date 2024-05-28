from rest_framework import viewsets, permissions, mixins, generics, status
from .serializers import FeedbackSerializer, ContactSerializer, UpgradeSerializer, VideoFileSerializer
from .models import Feedback, Contact, Upgrade
from rest_framework.views import APIView
from rest_framework.response import Response
import razorpay
from django.conf import settings
import requests
import cv2
import numpy as np
from keras.models import load_model # type: ignore
from collections import Counter
import pickle
from nltk.stem.porter import PorterStemmer
import re
from nltk.corpus import stopwords
import nltk

nltk.download('stopwords')

with open("api/trained_model.sav", "rb") as f:
    model = pickle.load(f)

with open("api/vectorizer.pickle", "rb") as f:
    vectorizer = pickle.load(f)

class FeedbackViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        feedback_content = serializer.validated_data['comment']

        stemmed_content = self.stem_content(feedback_content)
        transformed_content = vectorizer.transform([stemmed_content])
        prediction = model.predict(transformed_content)[0]
        sentiment = 'Positive' if prediction == 1 else 'Negative'

        serializer.save(user=self.request.user, sentiment=sentiment)

    def stem_content(self, content):
        port_stem = PorterStemmer()
        stemmed_content = re.sub('[^a-zA-Z]', ' ', content)
        stemmed_content = stemmed_content.lower().split()
        stemmed_content = [port_stem.stem(word) for word in stemmed_content if word not in stopwords.words('english')]
        return ' '.join(stemmed_content)

class ContactView(generics.CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [permissions.AllowAny] 

    def perform_create(self, serializer):
        serializer.save()


razorpay_client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

class UpgradeCreateView(generics.CreateAPIView):
    queryset = Upgrade.objects.all()
    serializer_class = UpgradeSerializer

    def perform_create(self, serializer):
        amount = serializer.validated_data['amount'] * 100  
        payment = razorpay_client.order.create({'amount': amount, 'currency': 'INR', 'payment_capture': '1'})
        
        serializer.save(payment_id=payment['id'])
    
class UpgradeDetailsView(generics.RetrieveAPIView):
    queryset = Upgrade.objects.all()
    serializer_class = UpgradeSerializer

    def get_object(self):
        user_email = self.kwargs['user_email'] 
        try:
            return Upgrade.objects.get(email=user_email) 
        except Upgrade.DoesNotExist:
            return Response({'error': 'Upgrade not found'}, status=status.HTTP_404_NOT_FOUND)
class SuccessView(APIView):
    def post(self, request):
        razorpay_order_id = request.data.get('razorpay_order_id')
        if not razorpay_order_id:
            return Response({'error': 'Missing razorpay_order_id'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            upgrade = Upgrade.objects.get(payment_id=razorpay_order_id)
            upgrade.paid = True
            upgrade.save()
            return Response({'success': True})
        except Upgrade.DoesNotExist:
            return Response({'error': 'Invalid order_id'}, status=status.HTTP_404_NOT_FOUND)
    
    

def fetch_books(query):
    # url = "https://www.googleapis.com/books/v1/volumes?q=happy&key=AIzaSyDUKCLVwPSQSex72ShbZeDWMp9srfDTNyQ"
    search_url = "https://www.googleapis.com/books/v1/volumes"

    search_params = {
        'filter': 'full',
        'maxResults': 10,
        'key': settings.BOOKS_API_KEY,
        'q': query,
    }

    r = requests.get(search_url,params=search_params)
    results = r.json()['items']
    books = []
    for result in results:
        book_url = result.get('selfLink')
        if book_url:
            book_details = requests.get(book_url).json()
            book_data = {
                'id': book_details['id'],
                'title':book_details['volumeInfo'].get('title', ''),
                'subtitle':book_details['volumeInfo'].get('subtitle', ''),
                'publishedDate':result['volumeInfo'].get('publishedDate'),
                'authors':result['volumeInfo'].get('authors', []),
                'publisher':book_details['volumeInfo'].get('publisher',''),
                'description':book_details['volumeInfo'].get('description', ''),
                'isbn':book_details['volumeInfo'].get('industryIdentifiers', []),
                'pageCount':book_details['volumeInfo'].get('pageCount', ''),
                'categories':result['volumeInfo'].get('categories', []),
                'language':book_details['volumeInfo'].get('language', ''),
                'thumbnail':book_details['volumeInfo']['imageLinks'].get('small', ''),
                'webReaderLink':book_details['accessInfo'].get('webReaderLink', ''),
                'download':book_details['accessInfo']['pdf'].get('downloadLink','')
            }
            books.append(book_data)

    return books
class BookSearchAPIView(APIView):
    def get(self, request):
        query = request.query_params.get('q', '')  
        books = fetch_books(query)
        return Response(books)

def fetch_videos(query):
    videos = []
    search_url = 'https://www.googleapis.com/youtube/v3/search'
    video_url = 'https://www.googleapis.com/youtube/v3/videos'
    search_params = {
        'part': 'snippet',
        'q': query,
        'key': settings.YOUTUBE_DATA_API_KEY,
        'maxResults': 5,
        'type': 'video'
    }

    r = requests.get(search_url, params=search_params)
    results = r.json()['items']

    video_ids = [result['id']['videoId'] for result in results]

    video_params = {
        'key': settings.YOUTUBE_DATA_API_KEY,
        'part': 'snippet',
        'maxResults': 5,
        'id': ','.join(video_ids),
    }

    r = requests.get(video_url, params=video_params)
    results = r.json()['items']

    for result in results:
        video_data = {
            'id': result['id'],
            'title': result['snippet']['title'],
            'description': result['snippet']['description'],
            'url' : f'https://www.youtube.com/watch?v={result["id"]}',
            'thumbnail' : result['snippet']['thumbnails']['high']['url']
        }
        videos.append(video_data)

    return videos
class VideoSearchAPIView(APIView):
    def get(self, request):
        query = request.query_params.get('q', '')  
        books = fetch_videos(query)
        return Response(books)
class RecordingView(APIView):
    def post(self, request):
        serializer = VideoFileSerializer(data=request.data)
        if serializer.is_valid():
            video_file = serializer.validated_data['video_file']
            
            if video_file.content_type != "video/webm":
                return Response({"error": "Invalid file format."}, status=400)
            
            with open("media/recording/recording.mp4", "wb") as f:
                for chunk in video_file.chunks():
                    f.write(chunk)

            return Response({"message": "Recording saved successfully."})
        else:
            return Response(serializer.errors, status=400)
class EmotionAnalysisView(APIView):
    def get(self, request):
        recognition_model = load_model('api\p2.h5')
        emotions = {0: 'fear', 1: 'happy', 2: 'neutral', 3: 'sad', 4: 'surprise'}

        video_path = "media/recording/recording.mp4"
        cap = cv2.VideoCapture(video_path)
        frames=[]      
        
        emotion_count = Counter()
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            frames.append(frame)
        cap.release()
        
        gray_frames = [cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY) for frame in frames]
        bounding_box = cv2.CascadeClassifier('api\haarcascades\haarcascade_frontalface_default.xml')
        
        for frame in gray_frames:
            num_faces = bounding_box.detectMultiScale(frame, scaleFactor=1.3, minNeighbors=5)
            for (x, y, w, h) in num_faces:
                detected_face = frame[y:y+h, x:x+w]
                rgb_frame = cv2.cvtColor(detected_face, cv2.COLOR_GRAY2RGB)
                resized_frame = cv2.resize(rgb_frame, (48, 48))
                input_data = np.expand_dims(resized_frame, axis=0) / 255.0
                predictions = recognition_model.predict(input_data)
                emotion_count += Counter({emotions[np.argmax(predictions[0])]: 1})

        total_emotions = sum(emotion_count.values())
        emotion_percentages = {emotion: (count / total_emotions) * 100 for emotion, count in emotion_count.items()}

        context = {
            'emotion_percentages': emotion_percentages,
        }
        return Response(context)