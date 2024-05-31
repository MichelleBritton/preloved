from rest_framework import generics, permissions, filters
from preloved.permissions import IsOwnerOrReadOnly
from .models import Advert
from .serializers import AdvertSerializer


class AdvertList(generics.ListCreateAPIView):
    """
    Create and list adverts 
    """

    serializer_class = AdvertSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Advert.objects.all()
    filter_backends = [
        filters.SearchFilter,
    ]
    search_fields = [
        "title",
        "description",
        "location",
        "category",
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class AdvertDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, edit and delete an advert
    """

    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = AdvertSerializer   
    queryset = Advert.objects.all()