from re import template
from django.http import response, JsonResponse
from django.http.response import Http404, HttpResponse
from django.shortcuts import render
from .serializers import PostSerializer
from .models import Post
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.


def detail_postview(request, postid, *args, **kwargs):
    return render(request, 'pages/detail.html', context={'postid': postid})

def postview(request, *args, **kwargs):
    return render(request, 'pages/home.html')

def categoryview(request, category, *args, **kwargs):
    return render(request, 'pages/category.html', context={'category': category})

def testview(request):
    print(request.user)
    print(request.user.is_authenticated)
    return render(request, 'pages/test.html')

