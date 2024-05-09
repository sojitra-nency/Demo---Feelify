from django.urls import path
from . import views

urlpatterns = [
    path('recording/',views.recording,name='recording'),
    path("emotion-analysis/", views.emotion_analysis, name="emotion_analysis"),
]

# POST
# recording -> http://127.0.0.1:8000/emotions/recording/ -> body-> form -> video_file=video/mp4 and the recording.mp4 file -> access token in bearer 

# GET
# emotion_analysis ->  http://127.0.0.1:8000/emotions/emotion-analysis/ 