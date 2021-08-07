from django import urls
from django.urls import path
from .views import postview, detail_postview

urlpatterns = [
    path('', postview),
    path('posts/<int:postid>/', detail_postview),
]

