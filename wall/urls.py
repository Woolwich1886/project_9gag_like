from django.urls import path
from .views import postview, detail_postview, categoryview, createview

urlpatterns = [
    path('', postview),
    path('posts/<int:postid>/', detail_postview),
    path('posts/create/', createview, name='create'),
    path('<str:category>/', categoryview),
]

