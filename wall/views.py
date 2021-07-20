from re import template
from django.http import response, JsonResponse
from django.http.response import Http404, HttpResponse
from django.shortcuts import render
from .serializers import PostSerializer
from .models import Post
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.


@api_view(['GET'])
def api_postview(request, *args, **kwargs):
    qs = Post.objects.all()
    ser = PostSerializer(qs, many=True)
    return Response(ser.data, status=200)


def postview(request, *args, **kwargs):
    posts = Post.objects.all()
    return render(request, 'pages/home.html', {'posts': posts})

