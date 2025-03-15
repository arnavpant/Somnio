from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    journal_font = models.CharField(max_length=50, default="Inter")
    bg_color = models.CharField(max_length=7, default="#004d70")  # Hex code for background color

    def __str__(self):
        return self.user.username
