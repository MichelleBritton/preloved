from django.db import models
from django.contrib.auth.models import User
from adverts.models import Post


class Like(models.Model):
    """
    Like model, related to 'owner' and 'advert'.
    'owner' is a User instance and 'advert' is an Advert instance.
    'unique_together' makes sure a user can't like the same advert twice.
    """
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    advert = models.ForeignKey(
        Advert, related_name='likes', on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ['owner', 'advert']

    def __str__(self):
        return f'{self.owner} {self.advert}'
