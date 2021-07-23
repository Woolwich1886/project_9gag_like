from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..serializers import PostSerializer
from ..models import Post

@api_view(['GET'])
def api_postview(request, *args, **kwargs):
    qs = Post.objects.all()
    ser = PostSerializer(qs, many=True)
    return Response(ser.data, status=200)

@api_view(['GET'])
def api_detail_postview(request, id, *args, **kwargs):
    qs = Post.objects.filter(id=id)
    if not qs.exists():
        return Response({}, status=404)
    item = qs.first()
    ser = PostSerializer(item)
    return Response(ser.data, status=200)