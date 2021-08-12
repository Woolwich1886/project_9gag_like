from django import urls
from django.urls import path
from .views import postview, detail_postview, categoryview, createview, testview

urlpatterns = [
    path('', postview),
    path('posts/<int:postid>/', detail_postview),
    path('posts/create/', createview, name='create'),
    path('<str:category>/', categoryview),
    path('test/test', testview)
]

