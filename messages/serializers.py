from rest_framework import serializers
from .models import Conversation, Message, Advert
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


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

        message = Message.objects.create(conversation=conversation, sender=sender, advert=advert, **validated_data)
        return message