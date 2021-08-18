from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy


def upload_to(instance, filename):
    return f'users/{filename}'

    
# Create your models here.
class CustomUser(AbstractUser):
    profile_image =  models.ImageField(gettext_lazy('ProfileImage'), upload_to=upload_to, default='users/default.png', blank=True)
    pass