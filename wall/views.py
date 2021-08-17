from wall.forms import PostForm
from django.shortcuts import redirect, render


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
