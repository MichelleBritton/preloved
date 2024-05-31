from django.db import models
from django.contrib.auth.models import User 

class Advert(models.Model):
    """
    Advert model, related to 'owner'
    """

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=255)
    description = models.TextField(max_length=255)
    location = models.CharField(max_length=255)
    price = models.FloatField()
    category = models.CharField(max_length=255)
    deliver = models.CharField(max_length=255)
    image_1 = models.ImageField(
        upload_to='images/', default='default_post_wndtrr'
    )
    image_2 = models.ImageField(
        upload_to='images/'
    )
    image_3 = models.ImageField(
        upload_to='images/'
    )
    image_4 = models.ImageField(
        upload_to='images/'
    )

    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.id} {self.title}"
