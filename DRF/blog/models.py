from users.models import CustomUser
from django.db import models

from users.models import CustomUser
from django.utils import timezone
from django.template.defaultfilters import slugify

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Post(models.Model):
    options = (('draft', 'Draft'), ('published', 'Published'))
    category = models.ForeignKey(Category, on_delete=models.PROTECT, default=1)
    title = models.CharField(max_length=250)
    content = models.TextField()
    slug = models.SlugField(max_length=250, unique_for_date='published', null=True, blank=True)
    published = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='blog_post')
    status = models.CharField(max_length=10, default='published', choices=options)
    rating = models.IntegerField(default=0, null=True, blank=True)


    class Meta:
        ordering =  ('-published',)

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)