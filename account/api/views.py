from account.models import Account
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination # пагинация

from ..serializers import AccountSerializer, AccountBadgeSerializer
from ..models import Account
from wall.models import Post
from wall.serializers import PostSerializer


#профиль пользователя
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_profile_view(request, username, *args, **kwargs):
    #print('username is ', username)
    qs = Account.objects.filter(user__username=username)
    #print(qs)
    item = qs.first()
    #print('iten is', item)
    serializer = AccountSerializer(item)
    return Response(serializer.data, status=200)


# посты пользователя
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_postview_by_user(request, username, *args, **kwargs):
    paginator = PageNumberPagination()
    paginator.page_size = 2
    qs = Post.objects.filter(user__username=username)
    qs_pages = paginator.paginate_queryset(qs, request)
    ser = PostSerializer(qs_pages, many=True, context={'req_user': request.user})
    return paginator.get_paginated_response(ser.data)


#"Аватарка" пользователя в комментах
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_profile_imageview(request, username, *args, **kwargs):
    print(username)
    qs = Account.objects.filter(user__username=username)
    item = qs.first()
    ser = AccountBadgeSerializer(item)
    print(ser.data)
    return Response(ser.data, status=200)
