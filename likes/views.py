from rest_framework import generics, permissions
from preloved.permissions import IsOwner
from likes.models import Like
from likes.serializers import LikeSerializer


class LikeList(generics.ListCreateAPIView):
    """
    List and create likes 
    Ensure only authenticated users can like posts 
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = LikeSerializer
    queryset = Like.objects.all()

    # Set the owner to be the user making the request
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class LikeDetail(generics.RetrieveDestroyAPIView):
    """
    Like detail 
    """
    permission_classes = [IsOwner]
    serializer_class = LikeSerializer
    queryset = Like.objects.all()