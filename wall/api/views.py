from rest_framework.decorators import api_view, authentication_classes, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.pagination import PageNumberPagination # пагинация

from ..serializers import CommentSerializer, PostRateSerializer, PostSerializer
from ..models import Comment, Post


# удаление поста
@api_view(['DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def delete_post(request, post_id, *args, **kwargs):
    paginator = PageNumberPagination()
    paginator.page_size = 2
    print(args, kwargs)
    qs = Post.objects.filter(id=post_id)
    print(Post.objects.filter(id=post_id))
    if not qs.exists():
        return Response({}, status=404)
    user = qs.filter(user=request.user)
    if not qs.exists():
        return Response({"message":"Вам не позволено удалять этот комментарий"}, status=401)
    post = qs.first()
    post.delete()
    return Response({"message":"Пост успешно удален"}, status=200)




# удаление коммента
@api_view(['DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def delete_comment(request, com_id, *args, **kwargs):
    print(args, kwargs)
    qs = Comment.objects.filter(id=com_id)
    print(Comment.objects.filter(id=com_id))
    if not qs.exists():
        return Response({}, status=404)
    user = qs.filter(user=request.user)
    if not qs.exists():
        return Response({"message":"Вам не позволено удалять этот комментарий"}, status=401)
    com = qs.first()
    com.delete()
    return Response ({"message":"Комментарий успешно удален"}, status=200)


# отправка коммента
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_comment(request, *args, **kwargs):
    serializer = CommentSerializer(data=request.data)
    #print(request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        post = data.get("post")
        text = data.get("text")
        user = request.user
        qs = Post.objects.filter(id=post.id)
        #print(request.data)
        item = qs.first()
        #print(item ,user, text)
        c = Comment(post=item, user=user, text=text)
       # print(c)
        c.save()
        item_com = get_comments(item ,request.data.get('sortType'), request.user)
        ser = PostSerializer(item, context={'req_user': request.user, 'comments': item_com})
        
        return Response(ser.data, status=201)

# кнопка голоса
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_rate_view(request, *args, **kwargs):
    
    '''
    upvote,downvote
    '''
    serializer = PostRateSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        post_id = data.get("id")
        vote_type = data.get("vote_type")
        qs = Post.objects.filter(id=post_id)
#       print(request.user)
        if not qs.exists():
            return Response({}, status=404)
        obj = qs.first()
        if vote_type == "upvote":
            obj.upvotes.add(request.user)
            obj.downvotes.remove(request.user)
            serializer = PostSerializer(obj, context={'req_user': request.user, 'sort_type': request.data.get('sortType')})
            return Response(serializer.data, status=200)
        elif vote_type == "downvote":
            obj.downvotes.add(request.user)
            obj.upvotes.remove(request.user)
            serializer = PostSerializer(obj, context={'req_user': request.user, 'sort_type': request.data.get('sortType')})
            return Response(serializer.data, status=200)
        elif vote_type == "delupvote":
            obj.upvotes.remove(request.user)
            serializer = PostSerializer(obj, context={'req_user': request.user, 'sort_type': request.data.get('sortType')})
            return Response(serializer.data, status=200)
        elif vote_type == "deldownvote":
            obj.downvotes.remove(request.user)
            serializer = PostSerializer(obj, context={'req_user': request.user, 'sort_type': request.data.get('sortType')})
            return Response(serializer.data, status=200)
    return Response({}, status=200) 

# основная лента
@api_view(['GET'])
def api_postview(request, *args, **kwargs):
    paginator = PageNumberPagination()
    paginator.page_size = 2
    qs = Post.objects.all()
    username = request.GET.get('username') # ?username = профиль
    if username !=None:
        qs=qs.filter(user__username=username)
    category = request.GET.get('category') # ?category = по категории
    if category !=None:
        qs=qs.filter(category__name=category)
    qs_pages = paginator.paginate_queryset(qs, request)
    ser = PostSerializer(qs_pages, many=True, context={'req_user': request.user})
    #print(ser.data)
    return paginator.get_paginated_response(ser.data)
    #return Response(ser.data, status=200)


# каждый пост отдельно

@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def api_detail_postview(request, id, *args, **kwargs):
    print(request.data)
    qs = Post.objects.filter(id=id)
    if not qs.exists():
        return Response({}, status=404)
    item = qs.first()
    print(item.comments.all())
    item_com = get_comments(item ,request.data.get('sortType'), request.user)
    ser = PostSerializer(item, context={'req_user': request.user, 'comments': item_com})
   # print(request.user)
    #print(ser.data,)
    return Response(ser.data, status=200)

# кнопка сортировки
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_sortview(request, id, *args, **kwargs):
    serializer = PostRateSerializer(data=request.data)
    qs = Post.objects.filter(id=id)
    print('data is =', request.data)
    if not qs.exists():
        return Response({}, status=404)
    item = qs.first()
    item_com = get_comments(item ,request.data.get('sortType'), request.user)
    print(request.data.get('sortType'))
    ser = PostSerializer(item, context={'req_user': request.user, 'comments': item_com})
    return Response(ser.data, status=200)
   # print(request.user)
    #print(ser.data,)
    

# функция для сериализатора комментов
def get_comments(item, request, user):
    if request == 'old':
        cms=item.comments.order_by('id')
        cms_ser = CommentSerializer(cms, many=True, context={'req_user': user})
        return cms_ser.data
    else:
        cms=item.comments.order_by('-id')
        cms_ser = CommentSerializer(cms, many=True, context={'req_user': user})
        return cms_ser.data
    