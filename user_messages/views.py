from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from user_messages.models import Conversation, Message
from adverts.models import Advert
from .serializers import ConversationSerializer, MessageSerializer
from django.contrib.auth.models import User
from rest_framework.exceptions import NotFound

class ConversationListCreateView(generics.ListCreateAPIView):
    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Return conversations associated with current user
        return self.request.user.conversations.all()

    def perform_create(self, serializer):
        # Retrieve participants for conversation from request data
        participants = self.request.data.get('participants')
        if not participants:
            return Response({'error': 'Participants are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        users = User.objects.filter(id__in=participants)
        if users.count() != len(participants):
            return Response({'error': 'Some participants not found'}, status=status.HTTP_404_NOT_FOUND)

        conversation = serializer.save()
        conversation.participants.set(users)
        conversation.save()


class ConversationDetailView(generics.RetrieveAPIView):
    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]
    queryset = Conversation.objects.all()


class MessageCreateView(generics.CreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        advert_id = self.kwargs.get('advert_id')
        try:
            advert = Advert.objects.get(id=advert_id)
        except Advert.DoesNotExist:
            raise NotFound("Advert not found")

        serializer.save(sender=self.request.user, advert=advert)