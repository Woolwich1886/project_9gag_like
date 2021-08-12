from re import template
from wall.forms import PostForm
from django.http import response, JsonResponse
from django.http.response import Http404, HttpResponse
from django.shortcuts import redirect, render
from .serializers import PostSerializer
from .models import Category, Post
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.


def detail_postview(request, postid, *args, **kwargs):
    return render(request, 'pages/detail.html', context={'postid': postid})

def postview(request, *args, **kwargs):
    return render(request, 'pages/home.html')

def categoryview(request, category, *args, **kwargs):
    return render(request, 'pages/category.html', context={'category': category})

def createview(request, *args, **kwargs):
    if request.user.is_authenticated:
        if request.method == 'POST':
            form = PostForm(request.POST or None, request.FILES or None)
            if form.is_valid():
                post = form.save(commit=False)
                post.user = request.user
                post.save()
                return redirect('/')
        else:
            form = PostForm()
                
    context = {
        'form': form,
        'title': 'Создать пост',
        'btn_text': 'Опубликовать'
    }
    return render(request, 'pages/create.html', context)

def testview(request):
    print(request.user)
    print(request.user.is_authenticated)
    return render(request, 'pages/test.html')

