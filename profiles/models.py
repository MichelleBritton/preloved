from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User 

class Profile(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    image = models.ImageField(
        upload_to='images/', default='../default_profile_p9bf83'
    )

    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.owner}'s profile"


# Every time a user is created, a signal will trigger the Profile model to be created
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(owner=instance)


# Listen for the post_save signal coming from the user model by calling the connect function
post_save.connect(create_profile, sender=User)
