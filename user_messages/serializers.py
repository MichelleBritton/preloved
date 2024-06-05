from rest_framework import serializers
from user_messages.models import Conversation, Message
from adverts.models import Advert
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class ConversationSerializer(serializers.ModelSerializer):
    participants = UserSerializer(many=True, read_only=True)
    messages = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = ['id', 'participants', 'created_at', 'messages']


class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    advert = serializers.PrimaryKeyRelatedField(queryset=Advert.objects.all(), write_only=True)

    class Meta:
        model = Message
        fields = ['id', 'conversation', 'sender', 'text', 'timestamp', 'advert']

    def create(self, validated_data):
        advert = validated_data.pop('advert')
        sender = self.context['request'].user
        recipient = advert.owner

        # Find or create a conversation between the sender and recipient
        conversation = Conversation.objects.filter(participants=sender).filter(participants=recipient).first()
        if not conversation:
            conversation = Conversation.objects.create()
            conversation.participants.add(sender, recipient)

        # Remove conversation and sender from validated_data if they exist
        validated_data.pop('conversation', None)
        validated_data.pop('sender', None)

        # Ensure the correct arguments are passed to Message.objects.create
        message = Message.objects.create(
            conversation=conversation,
            sender=sender,
            advert=advert,
            **validated_data
        )

        return message