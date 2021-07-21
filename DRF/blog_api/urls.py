from .views import PostList, PostDetail, PostListDetailfilter
#from rest_framework.routers import DefaultRouter
from django.urls import path

app_name = 'blog_api'

# router = DefaultRouter()
# router.register('', PostList, basename='post')
# urlpatterns = router.urls

urlpatterns = [
    path('search/', PostListDetailfilter.as_view(), name='postsearch'),
    path('', PostList.as_view(), name='listcreate'),
    path('posts/<str:slug>/', PostDetail.as_view(), name='detailcreate'),
]
