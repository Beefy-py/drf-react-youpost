from enum import unique
from rest_framework import serializers
from blog.models import Category, Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'category', 'slug', 'author', 'content', 'status','rating', 'published')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'