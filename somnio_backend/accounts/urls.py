from django.urls import path, include
from .views import SignupView, LoginView, UserSettingsUpdateView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('settings/', UserSettingsUpdateView.as_view(), name='user_settings'),
]
