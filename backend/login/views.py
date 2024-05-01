from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import UserRegistrationSerializer, LoginSerializer, UserProfileSerializer, ChangePasswordSerializer, PasswordResetSerializer, UserPasswordResetSerializer
from django.contrib.auth import authenticate
from .renderers import UserRenderer 
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .models import *


# Manually generate tokens for user
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = get_tokens_for_user(user)
        return Response({'token':token, 'msg':'Registration successfull'}, status=status.HTTP_201_CREATED)
        
class LoginView(APIView):
    renderer_class = [UserRenderer]
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)
        if user is not None:
            token = get_tokens_for_user(user)
            return Response({'token':token, 'msg':'Login successfull'}, status=status.HTTP_200_OK)
        else:
            return Response({'msg':'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserChangePassword(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data, context={'user':request.user})
        serializer.is_valid(raise_exception=True)
        return Response({'msg':'Password Changed Successfully'}, status=status.HTTP_200_OK)
        
class SendPasswordResetEmail(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'msg':'Password Reset Email has been sent'}, status=status.HTTP_200_OK)

class PasswordResetView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, uid, token):
        serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
        serializer.is_valid(raise_exception=True)
        return Response({'msg':'Password Reset Successfull'}, status=status.HTTP_200_OK)



