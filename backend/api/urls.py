from django.urls import path
from .views import FeedbackViewSet, ContactView, UpgradeCreateView, SuccessView, BookSearchAPIView, VideoSearchAPIView, RecordingView, EmotionAnalysisView

urlpatterns = [
    path('feedback/', FeedbackViewSet.as_view({'post': 'create'}), name='book_search_api'),
    path('contact/', ContactView.as_view(), name='contact_api'),
    path('upgrades/', UpgradeCreateView.as_view(), name="upgrade-create"),
    path('upgrades/<int:user_id>', UpgradeCreateView.as_view(), name="upgrade-create"),
    path('success/', SuccessView.as_view(), name="success"),
    path('book-search/', BookSearchAPIView.as_view(), name='book_search_api'),
    path('video-search/', VideoSearchAPIView.as_view(), name='video_search_api'),
    path('recording/', RecordingView.as_view(), name='recording'),
    path('emotion-analysis/', EmotionAnalysisView.as_view(), name='emotion-analysis'),
]