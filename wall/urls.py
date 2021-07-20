from django.urls import path

from .views import api_postview, postview

urlpatterns = [
    path('api/', api_postview),
    path('', postview)
]
