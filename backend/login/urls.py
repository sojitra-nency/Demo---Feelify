from django.urls import path, re_path
from .views import *

urlpatterns = [
    re_path(r'^o/(?P<provider>\S+)/$',CustomProviderAuthView.as_view(), name="provider-auth"),
    path('jwt/create/', CustomTokenObtainView.as_view()),
    path('jwt/refresh/', CustomTokenRefreshView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('profile/<int:pk>/', UserProfile.as_view()),
    path('profile/', UserProfile.as_view()),
]

# POST
# register - http://127.0.0.1:8000/login/users/ - first_name, last_name, email, password, re_password (activation mail will be send)
# activate account - http://127.0.0.1:8000/login/users/activation/ - uid, token (from mail)
# login - http://127.0.0.1:8000/login/jwt/create/ - email, password
# refresh token - http://127.0.0.1:8000/login/jwt/refresh/ 
# reset password - http://127.0.0.1:8000/login/users/reset_password/ - email (rest password mail will be send)
# reset password confirm - http://127.0.0.1:8000/login/users/reset_password_confirm/ - uid, token, new_password, re_new_password (uid, token from mail)
# logout - http://127.0.0.1:8000/login/logout/ - access token in bearer for authentication
# user profile - http://127.0.0.1:8000/login/profile/<int:pk>/ - <int:pk>- Primary key of user, access token in bearer for authentication

# GET
# current user - http://127.0.0.1:8000/login/users/me/ - access token in auth bearer for authentication
# google auth - http://127.0.0.1:8000/login/o/google-oauth2/?redirect_uri=http://localhost:3000/auth/google
# user profile - http://127.0.0.1:8000/login/profile/<int:pk>/ - <int:pk>- Primary key of user, access token in bearer for authentication
