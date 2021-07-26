from .views import CreatePost, DeletePost, PostList, PostDetail, PostListDetailfilter, UpdatePost
#from rest_framework.routers import DefaultRouter
from django.urls import path

app_name = 'blog_api'

# router = DefaultRouter()
# router.register('', PostList, basename='post')
# urlpatterns = router.urls

urlpatterns = [
    path('search/', PostListDetailfilter.as_view(), name='post_search'),
    path('', PostList.as_view(), name='listcreate'),
    path('posts/<str:slug>/', PostDetail.as_view(), name='detail_post'),

    path('create-post/', CreatePost.as_view(), name='create_post'),
    path('update-post/<str:slug>', UpdatePost.as_view(), name='update_post'),
    path('delete-post/<str:slug>', DeletePost.as_view(), name='delete_post'),
]
