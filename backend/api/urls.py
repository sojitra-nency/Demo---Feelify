from django.urls import path
from .views import FeedbackViewSet, ContactView

urlpatterns = [
    path('feedback/', FeedbackViewSet.as_view({'post': 'create'}), name='book_search_api'),
    path('contact/', ContactView.as_view(), name='contact_api'),
]