from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import VideoFileSerializer
import cv2
import numpy as np
from keras.models import load_model # type: ignore
from collections import Counter

class RecordingView(APIView):
    def post(self, request):
        serializer = VideoFileSerializer(data=request.data)
        if serializer.is_valid():
            video_file = serializer.validated_data['video_file']
            
            if video_file.content_type != "video/mp4":
                return Response({"error": "Invalid file format."}, status=400)
            
            with open("media/recording/recording.mp4", "wb") as f:
                for chunk in video_file.chunks():
                    f.write(chunk)

            return Response({"message": "Recording saved successfully."})
        else:
            return Response(serializer.errors, status=400)


class EmotionAnalysisView(APIView):
    def get(self, request):
        recognition_model = load_model('emotions\p2.h5')
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
        bounding_box = cv2.CascadeClassifier('emotions\haarcascades\haarcascade_frontalface_default.xml')
        
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