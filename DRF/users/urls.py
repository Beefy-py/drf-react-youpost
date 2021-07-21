from django.urls import path
from .views import RegisterUserView, BlacklistTokenView, UserListView, UserDetailView

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register_user'),
    path('logout/blacklist/', BlacklistTokenView.as_view(), name='blacklist'),
    path('list/', UserListView.as_view(), name='user_list'),
    path('list/<int:pk>', UserDetailView.as_view(), name='user_list'),
]