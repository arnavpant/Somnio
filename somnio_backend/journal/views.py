from django.shortcuts import render

from rest_framework import viewsets, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import JournalEntry
from .serializers import JournalEntrySerializer

class JournalEntryViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]  # require JWT
    permission_classes = [permissions.IsAuthenticated]  # must be logged in

    queryset = JournalEntry.objects.all()
    serializer_class = JournalEntrySerializer

    def get_queryset(self):
        # Only return entries for the current user
        return JournalEntry.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Automatically set the user
        serializer.save(user=self.request.user)

