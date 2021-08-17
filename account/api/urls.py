from django.urls import path

from .views import (api_profile_view, 
                    api_postview_by_user,
                    api_profile_imageview, 
                    )


from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api/profile/<str:username>/', api_profile_view),
    path('api/profile/<str:username>/', api_postview_by_user),
    path('api/profile/<str:username>/badge/', api_profile_imageview)
]
#if settings.DEBUG:

    #urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)