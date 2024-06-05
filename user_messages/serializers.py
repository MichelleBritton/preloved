from rest_framework import serializers
from user_messages.models import Conversation, Message
from adverts.models import Advert
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    advert = serializers.PrimaryKeyRelatedField(queryset=Advert.objects.all(), write_only=True)
    conversation = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'conversation', 'sender', 'text', 'timestamp', 'advert']
        extra_kwargs = {
            'advert': {'write_only': True}
        }

    def create(self, validated_data):
        advert = validated_data.pop('advert')
        sender = self.context['request'].user
        recipient = advert.owner

        # Find or create a conversation between the sender and recipient
        conversation = Conversation.objects.filter(participants=sender).filter(participants=recipient).first()
        if not conversation:
            conversation = Conversation.objects.create()
            conversation.participants.add(sender, recipient)
            # Include advert details in the initial message
            validated_data['text'] = f"[Advert: {advert.title}] {validated_data['text']}"

        # Ensure the correct arguments are passed to Message.objects.create
        message = Message.objects.create(
            conversation=conversation,
            sender=sender,
            advert=advert,
            **validated_data
        )

        return message


class ConversationSerializer(serializers.ModelSerializer):
    participants = UserSerializer(many=True, read_only=True)
    messages = MessageSerializer(many=True, read_only=True)  

    class Meta:
        model = Conversation
        fields = ['id', 'participants', 'created_at', 'messages']