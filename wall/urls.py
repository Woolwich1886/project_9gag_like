from django import urls
from django.urls import path





from .views import postview, detail_postview

urlpatterns = [
    path('posts/', postview),
    path('<int:id>/', detail_postview),
]

