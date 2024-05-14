from django.conf import settings
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from djoser.social.views import ProviderAuthView
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from login.models import User
from login.serializers import UserProfileSerializer
from django.conf import settings


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

        if not refresh_token:
            return Response("Refresh token not found", status=status.HTTP_401_UNAUTHORIZED)

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
    


# class LogoutView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request, *args, **kwargs):
#         response = Response("Logout successful.", status=status.HTTP_204_NO_CONTENT)
#         response.delete_cookie('access')
#         response.delete_cookie('refresh')
#         return response
    
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

class LogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh')
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except Exception as e:  
                return Response({"error": "Invalid refresh token"}, status=status.HTTP_400_BAD_REQUEST)

        access_token = request.COOKIES.get('access')
        if access_token:
            try:
                token = AccessToken(access_token)
                token.blacklist()
            except Exception as e:  
                return Response({"error": "Invalid access token"}, status=status.HTTP_400_BAD_REQUEST)

        response = Response("Logout successful.", status=status.HTTP_204_NO_CONTENT)
        response.delete_cookie('access')
        response.delete_cookie('refresh')

        return response

class UserProfile(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def retrieve(self, request, *args, **kwargs): 
        if request.user.is_authenticated:
            serializer = self.get_serializer(request.user)  
            return Response(serializer.data)
        else:
            return Response("Not authenticated", status=status.HTTP_401_UNAUTHORIZED)

    def perform_update(self, serializer):
        serializer.save()
        return super().perform_update(serializer)

    def delete(self, instance):
        instance.is_deleted = True
        instance.save()

