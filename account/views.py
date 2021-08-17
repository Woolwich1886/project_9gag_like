from django.contrib import messages
from django.shortcuts import redirect, render
from django.http import Http404
from django.contrib.auth import authenticate,login, logout, get_user_model
# Create your views here.

from .models import Account
from .forms import EditProfileForm, LoginForm, RegistrationForm


User=get_user_model()


#Вью редактирования профиля
def edit_profile_view(request, username, *args, **kwargs):
    if not request.user.is_authenticated:
        return redirect('login')
    qs = Account.objects.filter(user__username=username)
    if not qs.exists():
        raise Http404
    account = qs.first()
   #print(request.user)
   #print(account.user)
    if request.user == account.user:
        if request.method == 'POST':
            form = EditProfileForm(request.POST or None, request.FILES or None, instance=account)
            if form.is_valid():
                form.save()
                return redirect (request.path_info)
        else:
            form = EditProfileForm(instance=account)
    else:
        return redirect('/')
    context = {'username': username,
               'account': account,
               'form': form}
    return render (request, 'pages/edit_profile.html', context)


#Вью просмотра профиля
def profile_view(request, username, *args, **kwargs):
    qs = Account.objects.filter(user__username=username)
    if not qs.exists():
        raise Http404
    item = qs.first()
    context = {'username': username,
                'account': item}
    return render(request, "pages/profile.html", context)


#Вью логина
def login_view(request, *args, **kwargs):
    if request.user.is_authenticated:
        return redirect('/')
    elif request.method == 'POST':
        form = LoginForm(request.POST or None)
        if form.is_valid():
            cd = form.cleaned_data
            user = authenticate(request,
                                username = cd['username'],
                                password = cd['password1'])
            if user is not None:
                if user.is_active:
                    login(request,user)
                    return redirect ('/')
            else:
                messages.info(request, 'Неверный пароль')
    else:   
        form = LoginForm()
    context = {
        'form': form,
        'title': 'Авторизация',
        'btn_text': 'Вход',
    }
    return render(request, 'pages/auth.html', context)


#Вью регистрации
def registration_view(request, *args, **kwargs):
    if request.user.is_authenticated:
        return redirect('/')
    elif request.method == 'POST':
        form = RegistrationForm(request.POST or None)
        if form.is_valid():
            cd = form.cleaned_data
            cu = User.objects.create_user(
                                    username = cd['username'],
                                    password = cd['password1']
            )
            Account.objects.create(
                                user = cu,
                                first_name = cd['first_name'],
                                second_name = cd['second_name']
            )                 
            user = authenticate(request,
                                username = cd['username'],
                                password = cd['password1'])
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return redirect ('/')
    else:
        form = RegistrationForm()
    context = {
        'form': form,
        'title': 'Регистрация',
        'btn_text': 'Зарегистрироваться',
    }
    return render(request, 'pages/auth.html', context)

#Вью выхода из профиля
def logout_view(request, *args, **kwargs):
    logout(request)
    return redirect("/login")