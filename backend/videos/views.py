from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
import requests

def fetch_videos(query):
    videos = []
    search_url = 'https://www.googleapis.com/youtube/v3/search'
    video_url = 'https://www.googleapis.com/youtube/v3/videos'
    search_params = {
        'part': 'snippet',
        'q': query,
        'key': settings.YOUTUBE_DATA_API_KEY,
        'maxResults': 50,
        'type': 'video'
    }

   

    r = requests.get(search_url, params=search_params)
    results = r.json()['items']

    video_ids = [result['id']['videoId'] for result in results]

    video_params = {
        'key': settings.YOUTUBE_DATA_API_KEY,
        'part': 'snippet',
        'maxResults': 50,
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



