# accounts/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User

from .serializers import UserSerializer

class SignupView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # calls create() method in serializer
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            # Option 1: Use session-based auth (cookies)
            login(request, user)
            return Response({"message": "Logged in successfully"}, status=status.HTTP_200_OK)
            
            # Option 2 (alternative): Return a token or JWT if using token-based auth
            # For now, let's keep it simple with sessions
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
