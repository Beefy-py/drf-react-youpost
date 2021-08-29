from django.db import models

from users.models import CustomUser
from django.utils import timezone
from django.template.defaultfilters import slugify
from django.utils.translation import gettext_lazy



def upload_to(instance, filename):
    return f'posts/{filename}'

# Create your models here.
class Post(models.Model):
    options = (('draft', 'Draft'), ('published', 'Published'))
    title = models.CharField(max_length=250, unique=True)
    image = models.ImageField(gettext_lazy('Image'), upload_to=upload_to, default='posts/default.jpg', blank=True)
    content = models.TextField()
    slug = models.SlugField(max_length=250, unique_for_date='published', null=True , blank=True)
    published = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True) 
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


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    posted = models.DateTimeField(auto_now_add=True) 
    updated = models.DateTimeField(auto_now=True) 
    
    class Meta: 
        ordering = ('-posted',) 

    def __str__(self):
        return f'commented on {self.post} by {self.author}'

