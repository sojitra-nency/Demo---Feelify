from django.urls import path
from .views import VideoSearchAPIView

urlpatterns = [
    path('video-search/', VideoSearchAPIView.as_view(), name='video_search_api'),
]


# GET
# search videos by query = http://127.0.0.1:8000/videos/video-search/?q=<query> -> access token in bearer for authentication