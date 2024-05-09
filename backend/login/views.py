from django.conf import settings
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from djoser.social.views import ProviderAuthView
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.permissions import AllowAny


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