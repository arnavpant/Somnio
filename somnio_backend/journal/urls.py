from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JournalEntryViewSet

router = DefaultRouter()
router.register(r'entries', JournalEntryViewSet, basename='journalentry')

urlpatterns = [
    # The router automatically generates:
    # GET /journal/entries/
    # POST /journal/entries/
    # GET /journal/entries/<id>/
    # PUT /journal/entries/<id>/
    # DELETE /journal/entries/<id>/
]

urlpatterns += router.urls
