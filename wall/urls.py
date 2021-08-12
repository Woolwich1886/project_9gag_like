from django import urls
from django.urls import path
from .views import postview, detail_postview, categoryview,testview

urlpatterns = [
    path('', postview),
    path('posts/<int:postid>/', detail_postview),
    path('<str:category>/', categoryview),
    path('test/test', testview)
]

