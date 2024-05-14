from django.urls import path
from .views import RecordingView, EmotionAnalysisView

urlpatterns = [
    path('recording/', RecordingView.as_view(), name='recording'),
    path('emotion-analysis/', EmotionAnalysisView.as_view(), name='emotion-analysis'),
]

# POST
# recording -> http://127.0.0.1:8000/emotions/recording/ -> body-> form -> video_file=video/mp4 and the recording.mp4 file -> access token in bearer 

# GET
# emotion_analysis ->  http://127.0.0.1:8000/emotions/emotion-analysis/ 