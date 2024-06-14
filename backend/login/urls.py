from django.urls import path, re_path
from .views import *

urlpatterns = [
    re_path(r'^o/(?P<provider>\S+)/$',CustomProviderAuthView.as_view(), name="provider-auth"),
    path('jwt/create/', CustomTokenObtainView.as_view()),
    path('jwt/refresh/', CustomTokenRefreshView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('profile/<int:pk>/', UserProfile.as_view()),
]

