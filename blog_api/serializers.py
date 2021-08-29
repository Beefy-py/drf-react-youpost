from enum import unique
from rest_framework import serializers
from blog.models import Category, Comment, Post

class PostSerializer(serializers.ModelSerializer):
    content = serializers.CharField(trim_whitespace=False)
    
    class Meta:
        model = Post
        fields = ('id', 'title', 'image' ,'category', 'slug', 'author', 'content', 'status','rating', 'published')

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields =('post', 'author', 'text', 'posted')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

