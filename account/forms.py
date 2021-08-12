from django import forms
from django.core import validators
from django.contrib.auth import REDIRECT_FIELD_NAME, get_user_model
import re

from django.core.exceptions import ValidationError
User = get_user_model()



class LoginForm(forms.Form):
    username = forms.CharField(widget=forms.TextInput(attrs={
                                                            'class': 'form-control',
                                                            'placeholder': 'Введите логин'                                                
    }), label='Логин')
    password1 = forms.CharField(widget=forms.PasswordInput(attrs={
                                                                'class': 'form-control',
                                                                'placeholder': 'Введите пароль'
    }), label='Пароль')


    def clean_username(self):
        username = self.cleaned_data.get("username")
        qs = User.objects.filter(username__iexact=username)
        if not qs.exists():
            raise forms.ValidationError("Такого логина не существует")
        return username

class RegistrationForm(forms.Form):
    username = forms.CharField(max_length=20 ,widget=forms.TextInput(attrs={
                                                            'class': 'form-control',
                                                            'placeholder': 'Введите логин'                                                   
    }), label='Логин')
    password1 = forms.CharField(widget=forms.PasswordInput(attrs={
                                                                'class': 'form-control',
                                                                'placeholder': 'Введите пароль'
    }), label='Пароль')
    password2 = forms.CharField(widget=forms.PasswordInput(attrs={
                                                                'class': 'form-control',
                                                                'placeholder': 'Повторите пароль'
    }), label='Подтверждение пароля')
    first_name = forms.CharField(max_length=20 ,widget=forms.TextInput(attrs={
                                                            'class': 'form-control',
                                                            'placeholder': 'Введите имя'
                                                            
    }), label='Имя', validators=[validators.RegexValidator(
                                                            regex=r'^[a-zA-Z]+$', 
                                                            message='В имени цифры недопустимы', 
                                                            code='invalid_format')])
    second_name = forms.CharField(max_length=20 ,widget=forms.TextInput(attrs={
                                                            'class': 'form-control',
                                                            'placeholder': 'Введите фамилию'
                                                            
    }), label='Фамилия', validators=[validators.RegexValidator(
                                                            regex=r'^[a-zA-Z]+$', 
                                                            message='В фамилии цифры недопустимы', 
                                                            code='invalid_format')])


    def clean_password2(self):
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')
        if password1 != password2:
            raise forms.ValidationError("Пароли не совпадают")
        return password2

    
    def clean_username(self):
        username = self.cleaned_data.get("username")
        qs = User.objects.filter(username=username)
        if qs.exists():
            raise forms.ValidationError("Этот логин уже занят, выберите другой")
        return username