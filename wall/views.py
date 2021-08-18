from wall.forms import PostForm
from django.shortcuts import redirect, render
from .models import Category
from django.http import Http404

# Create your views here.

# Контроллер отображения каждого поста отдельно
def detail_postview(request, postid, *args, **kwargs):
    return render(request, 'pages/detail.html', context={'postid': postid})

# Контроллер главной страницы


def postview(request, *args, **kwargs):
    return render(request, 'pages/home.html')

# Контроллер отображения по категориям


def categoryview(request, category, *args, **kwargs):
    if not Category.objects.filter(name=category).exists():
        print(category)
        return render(request, 'pages/404.html')
    return render(request, 'pages/category.html', context={'category': category})

# Контроллер создания поста


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

def error_404(request, exception):
        data = {}
        return render(request,'pages/404.html', data)