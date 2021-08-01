from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterUserSerializer, UserListSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

from .models import CustomUser


# Create your views here.
class RegisterUserView(APIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterUserSerializer

    def post(self, request):
        reg_seria = RegisterUserSerializer(data=request.data)
        if reg_seria.is_valid():
            new_user = reg_seria.save()
            if new_user:
                return Response(status=status.HTTP_201_CREATED)
        return Response(reg_seria.errors,status=status.HTTP_400_BAD_REQUEST)

class BlacklistTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            token = RefreshToken(request.data['refresh_token'])
            token.blacklist()
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserListSerializer

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserListSerializer