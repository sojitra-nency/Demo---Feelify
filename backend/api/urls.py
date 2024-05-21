from django.urls import path
from .views import FeedbackViewSet, ContactView, UpgradeCreateView, SuccessView

urlpatterns = [
    path('feedback/', FeedbackViewSet.as_view({'post': 'create'}), name='book_search_api'),
    path('contact/', ContactView.as_view(), name='contact_api'),
    path('upgrades/', UpgradeCreateView.as_view(), name="upgrade-create"),
    path('success/', SuccessView.as_view(), name="success"),
]