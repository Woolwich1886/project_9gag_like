from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..serializers import PostRateSerializer, PostSerializer
from ..models import Post


@api_view(['POST'])

#@permission_classes([IsAuthenticated])
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
        
        if not qs.exists():
            return Response({}, status=404)
        obj = qs.first()
        if vote_type == "upvote":
            #obj.rating.add(request.user)
            obj.upvotes += 1
            obj.save()
            serializer = PostSerializer(obj)
            return Response(serializer.data, status=200)
        elif vote_type == "downvote":
            #obj.rating.add(request.user)
            obj.downvotes += 1
            obj.save()
            serializer = PostSerializer(obj)
            return Response(serializer.data, status=200)
    return Response({}, status=200) 


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