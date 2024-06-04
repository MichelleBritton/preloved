from django.db import models
from django.contrib.auth.models import User
from adverts.models import Advert


class Conversation(models.Model):
    participants = models.ManyToManyField(User, related_name='conversations')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Conversation between {', '.join([user.username for user in self.participants.all()])}"


class Message(models.Model):
    conversation = models.ForeignKey(Conversation, related_name='messages', on_delete=models.CASCADE)
    sender = models.ForeignKey(User, related_name'sent_messages'. on_delete=models.CASCADE)
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    advert = models.ForeignKey(Advert, related_name='messages', on_delete=models.CASCADE)

    def __str__(self):
        return f"Message from {self.sender.username} at {self.timestamp}"
