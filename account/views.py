from django.core.exceptions import ValidationError
from profiles.models import SocialUser
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from .forms import AuthForm, RegForm
# Create your views here.


def login_view(request, *args, **kwargs):
    if request.method == 'POST':
        form = AuthForm(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            user = authenticate(request,
                                username=cd['username'], 
                                password=cd['password'])
        if user is not None:
            login(request, user)
            return redirect("/")
        else:
            return redirect('/account/login/')
    context = {
        'form': AuthForm,
        'title': 'Авторизация',
        'btn_text': 'Авторизоваться',
    }
    return render(request, 'pages/auth.html', context)



def logout_view(request, *args, **kwargs):
    if request.method == 'GET':
        logout(request)
        redirect('/')
    return render(request, 'pages/auth.html', {})


def reg_view(request, *args, **kwargs):
    if request.user.is_authenticated:
        return redirect('/')
    else:
        if request.method == 'POST':
            form = RegForm(request.POST)
            if form.is_valid():
                cd = form.cleaned_data
                new_user = form.save(commit=False)
                new_user.set_password(cd['password1'])
                new_user.save()
                login(request, new_user)
                return redirect('/')

        context = {
            'form': RegForm,
            'title': 'Регистрация',
            'btn_text': 'Зарегистрироватсья',
        }
        return render(request, 'pages/auth.html', context)
        