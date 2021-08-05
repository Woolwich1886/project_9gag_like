from rest_framework import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination # пагинация


from ..serializers import CommentSerializer, PostRateSerializer, PostSerializer
from ..models import Comment, Post
#{"user": "adm", "post": 2, "text": "proverka"}

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_comment(request, *args, **kwargs):
    serializer = CommentSerializer(data=request.data)
    print(request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        post_id = data.get("post")
        text = data.get("text")
        user = request.user
        qs = Post.objects.filter(id=post_id.id)
        print(request.data)
        obj = qs.first()
     #   print(obj,user, text)
        c = Comment(post=obj, user=user, text=text)
       # print(c)
        c.save()
        serializer = PostSerializer(obj, context={'req_user': request.user, 'sort_type': request.data.get('sortType')})
        return Response(serializer.data, status=201)


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


@api_view(['GET'])
def api_postview(request, *args, **kwargs):
    paginator = PageNumberPagination()
    paginator.page_size = 1
    qs = Post.objects.all()
    qs_pages = paginator.paginate_queryset(qs, request)
    ser = PostSerializer(qs_pages, many=True, context={'req_user': request.user})
    #print(ser.data)
    return paginator.get_paginated_response(ser.data)
    #return Response(ser.data, status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_detail_postview(request, id, *args, **kwargs):
    qs = Post.objects.filter(id=id)
    if not qs.exists():
        return Response({}, status=404)
    item = qs.first()
    

    ser = PostSerializer(item, context={'req_user': request.user, 'sort_type': request.data.get('sortType')})
   # print(request.user)
    #print(ser.data,)
    return Response(ser.data, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_sortview(request, id, *args, **kwargs):
    serializer = PostRateSerializer(data=request.data)
    qs = Post.objects.filter(id=id)
    print('data is =', request.data)
    if not qs.exists():
        return Response({}, status=404)
    item = qs.first()
    ser = PostSerializer(item, context={'req_user': request.user, 'sort_type': request.data.get('sortType')})
    return Response(ser.data, status=200)
   # print(request.user)
    #print(ser.data,)
    