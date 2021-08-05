from django.urls import path
from django.urls.resolvers import URLPattern

from .views import api_postview, api_detail_postview, post_rate_view, send_comment, api_sortview


from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api/posts/', api_postview),
    path('api/posts/<int:id>', api_detail_postview),
    path('api/post/rate/', post_rate_view),
    path('api/posts/send_comment', send_comment),
    path('api/posts/<int:id>/sort', api_sortview)
]
if settings.DEBUG:

    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)