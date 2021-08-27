from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy


def upload_to(instance, filename):
    return f'users/{filename}'


# Create your models here.
class CustomUser(AbstractUser):
    # user_image =  models.ImageField(gettext_lazy('UserImage'), upload_to=upload_to, default='users/default.png')
    liked = models.ManyToManyField('blog.Post', related_name='liked_posts', blank=True)
    disliked = models.ManyToManyField('blog.Post', related_name='disliked_posts', blank=True)
    bookmarked = models.ManyToManyField('blog.Post', related_name='bookmarked_posts', blank=True)
    bio = models.CharField(max_length=300, default='...', blank=True, null=True)
   
