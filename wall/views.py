from django.http.response import Http404, HttpResponse
from django.shortcuts import render
from .serializers import PostSerializer
from .models import Post

# Create your views here.

def index(request):
    return HttpResponse("kek")