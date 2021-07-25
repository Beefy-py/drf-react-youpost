from django.shortcuts import get_object_or_404
from rest_framework import generics, filters, permissions
from rest_framework.decorators import permission_classes
from blog.models import Post
from .serializers import PostSerializer
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS, BasePermission
from rest_framework.viewsets import ViewSet, ModelViewSet
from rest_framework.response import Response
from django.contrib.auth.models import User

class PostList(generics.ListAPIView):   
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.all()

class PostDetail(generics.RetrieveAPIView):
    lookup_field = "slug"
    serializer_class = PostSerializer

    def get_object(self):
        item = self.kwargs.get('slug')
        return get_object_or_404(Post, slug=item)

class PostListDetailfilter(generics.ListAPIView):

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^slug']

    # '^' Starts-with search.
    # '=' Exact matches.
    # '@' Full-text search. (Currently only supported Django's PostgreSQL backend.)
    # '$' Regex search.

class CreatePost(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    
    
