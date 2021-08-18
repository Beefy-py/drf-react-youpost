from django.shortcuts import get_object_or_404
from rest_framework import generics, filters, permissions, status
from rest_framework import serializers
from rest_framework.decorators import parser_classes, permission_classes
from rest_framework.serializers import Serializer
from rest_framework.parsers import MultiPartParser, FormParser
from blog.models import Category, Post
from .serializers import CategorySerializer, PostSerializer
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS, BasePermission
from rest_framework.viewsets import ViewSet, ModelViewSet
from rest_framework.response import Response


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
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        post = dict(request.data)

        new_post = post.copy()

        new_post['title'] = post['title'][0]
        new_post['author'] = post['author'][0]
        new_post['content'] = post['content'][0]
        new_post['image'] = post['image'][0]
        new_post['slug'] = 'pree-eee'

        print(new_post)
        serializer = PostSerializer(data=new_post)

        if serializer.is_valid():
            serializer.save()
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class UpdatePost(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer
    lookup_field = "slug"

    def get_object(self):
        item = self.kwargs.get('slug')
        return get_object_or_404(Post, slug=item)
    

class DeletePost(generics.RetrieveDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer
    lookup_field = "slug"

    def get_object(self):
        item = self.kwargs.get('slug')
        return get_object_or_404(Post, slug=item)
    

class CategoryList(generics.ListAPIView):
    permission_classes =[permissions.IsAdminUser]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    
