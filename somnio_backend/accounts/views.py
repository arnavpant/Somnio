from rest_framework import generics, permissions
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import (
    UserSettingsSerializer,
    SignupSerializer,   # Create this if you haven't already
    # LoginSerializer can be omitted if using TokenObtainPairView directly.
)

class SignupView(generics.CreateAPIView):
    """
    Minimal Signup view using DRF's CreateAPIView.
    You need to implement SignupSerializer in accounts/serializers.py.
    """
    queryset = User.objects.all()
    serializer_class = SignupSerializer
    permission_classes = [permissions.AllowAny]

class LoginView(TokenObtainPairView):
    """
    Login view using SimpleJWT's TokenObtainPairView.
    This view returns an access and refresh token on successful authentication.
    """
    permission_classes = [permissions.AllowAny]

class UserSettingsUpdateView(generics.UpdateAPIView):
    """
    Allows an authenticated user to update their own settings.
    """
    serializer_class = UserSettingsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
