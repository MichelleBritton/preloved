from django.db.models import Count
from rest_framework import generics
from preloved.permissions import IsOwnerOrReadOnly
from .models import Profile
from .serializers import ProfileSerializer


class ProfileList(generics.ListAPIView):
    """
    List all profiles.
    """
    queryset = Profile.objects.all().order_by('-created_at')
    serializer_class = ProfileSerializer


class ProfileDetail(generics.RetrieveUpdateAPIView):
    """
    Retrieve or update a profile if you're the owner.
    """
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Profile.objects.all().order_by('-created_at')
    serializer_class = ProfileSerializer
