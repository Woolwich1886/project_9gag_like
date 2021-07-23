from django.urls import path
from django.urls.resolvers import URLPattern

from .views import api_postview, api_detail_postview

urlpatterns = [
    path('api/', api_postview),
    path('api/<int:id>', api_detail_postview),
]