from django.urls import path
from .views import FeedbackViewSet

urlpatterns = [
    path('feedback/', FeedbackViewSet.as_view({'post': 'create'}), name='book_search_api'),
]