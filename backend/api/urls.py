from django.urls import path
from .views import FeedbackViewSet, ContactView, UpgradeCreateView, SuccessView, BookSearchAPIView, VideoSearchAPIView, RecordingView, EmotionAnalysisView, UpgradeDetailsView

urlpatterns = [
    path('feedback/', FeedbackViewSet.as_view({'post': 'create', 'get': 'list' }), name='feedback'),
    path('contact/', ContactView.as_view(), name='contact_api'),
    path('upgrades/', UpgradeCreateView.as_view(), name="upgrade-create"),
    path('upgrades/<str:user_email>/', UpgradeDetailsView.as_view(), name="upgrade-details"),
    path('success/', SuccessView.as_view(), name="success"),
    path('book-search/', BookSearchAPIView.as_view(), name='book_search_api'),
    path('video-search/', VideoSearchAPIView.as_view(), name='video_search_api'),
    path('recording/', RecordingView.as_view(), name='recording'),
    path('emotion-analysis/', EmotionAnalysisView.as_view(), name='emotion-analysis'),
]