from re import template
from django.http import response, JsonResponse
from django.http.response import Http404, HttpResponse
from django.shortcuts import render
from .serializers import PostSerializer
from .models import Post
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.


def detail_postview(request, id, *args, **kwargs):
    post_list = Post.objects.filter(id=id)
    if post_list:
        post = post_list.first()
    else:
        raise Http404('not exists')
    return render(request, 'pages/home.html', {'post_list': post})

def postview(request, *args, **kwargs):
    posts = Post.objects.all()
    post_list=posts
    return render(request, 'pages/home.html')
