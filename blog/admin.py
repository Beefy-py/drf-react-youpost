from django.contrib import admin
from django.contrib.admin.options import ModelAdmin
from .models import *

# Register your models here.
@admin.register(Post)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('title','id','status','slug', 'author')
    prepopulated_fields = {'slug': ('title',),}

admin.site.register(Comment)