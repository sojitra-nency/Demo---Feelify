from django.conf import settings
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from djoser.social.views import ProviderAuthView
from rest_framework.permissions import AllowAny
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from login.models import User
from login.serializers import UserProfileSerializer


class CustomProviderAuthView(ProviderAuthView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 201:
            access_token = response.data.get("access")
            refresh_token = response.data.get("refresh")

            response.set_cookie(
                'access',
                access_token,
                max_age = settings.AUTH_COOKIE_ACCESS_MAX_AGE,
                path = settings.AUTH_COOKIE_PATH,
                secure = settings.AUTH_COOKIE_SECURE,
                httponly = settings.AUTH_COOKIE_HTTP_ONLY,
                samesite = settings.AUTH_COOKIE_SAMESITE
            )

            response.set_cookie(
                'refresh',
                refresh_token,
                max_age = settings.AUTH_COOKIE_REFRESH_MAX_AGE,
                path = settings.AUTH_COOKIE_PATH,
                secure = settings.AUTH_COOKIE_SECURE,
                httponly = settings.AUTH_COOKIE_HTTP_ONLY,
                samesite = settings.AUTH_COOKIE_SAMESITE
            )
        return response

class CustomTokenObtainView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data.get("access")
            refresh_token = response.data.get("refresh")

            response.set_cookie(
                'access',
                access_token,
                max_age = settings.AUTH_COOKIE_ACCESS_MAX_AGE,
                path = settings.AUTH_COOKIE_PATH,
                secure = settings.AUTH_COOKIE_SECURE,
                httponly = settings.AUTH_COOKIE_HTTP_ONLY,
                samesite = settings.AUTH_COOKIE_SAMESITE
            )

            response.set_cookie(
                'refresh',
                refresh_token,
                max_age = settings.AUTH_COOKIE_REFRESH_MAX_AGE,
                path = settings.AUTH_COOKIE_PATH,
                secure = settings.AUTH_COOKIE_SECURE,
                httponly = settings.AUTH_COOKIE_HTTP_ONLY,
                samesite = settings.AUTH_COOKIE_SAMESITE
            )
        return response
    

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh')

        if refresh_token:
            request.data['refresh'] = refresh_token
        
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data.get("access")

            response.set_cookie(
                'access',
                access_token,
                max_age = settings.AUTH_COOKIE_ACCESS_MAX_AGE,
                path = settings.AUTH_COOKIE_PATH,
                secure = settings.AUTH_COOKIE_SECURE,
                httponly = settings.AUTH_COOKIE_HTTP_ONLY,
                samesite = settings.AUTH_COOKIE_SAMESITE
            )
        return response
    


class LogoutView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        access_token = request.COOKIES.get('access')
        print("logout", access_token)  

        if not access_token:
            return Response("Already logged out.", status=status.HTTP_204_NO_CONTENT)

        response = Response("Logout successful.", status=status.HTTP_204_NO_CONTENT)
        response.delete_cookie('access')
        response.delete_cookie('refresh')
        return response
    
class UserProfile(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self):
        return self.request.user
    
    def perform_update(self, serializer):
        if 'avatar' in self.request.FILES:
            instance = serializer.save(avatar=self.request.FILES['avatar'])
        else:
            instance = serializer.save()

        return super().perform_update(serializer)
    
    def post(self, request, *args, **kwargs):

        if self.get_object():  
            return self.patch(request, *args, **kwargs)  
 
        serializer = self.get_serializer(data=request.data) 
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()

    def delete(self, instance):
        instance.is_deleted = True
        instance.save()
