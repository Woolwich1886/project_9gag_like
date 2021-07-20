from django import forms
from django.contrib.auth.forms import UserCreationForm

from profiles.forms import SocialUserCreationForm
from profiles.models import SocialUser




class AuthForm(forms.Form):
    username = forms.CharField(widget=forms.TextInput(attrs={'class': "form-control", 'style': 'max-width: 300px'}), label='Логин')
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': "form-control", 'style': 'max-width: 300px'}), label='Пароль')
    


class RegForm(UserCreationForm):
    username = forms.CharField(max_length=20, widget=forms.TextInput(attrs={'class': "form-control", 'style': 'max-width: 300px'}), label='Логин')
    password1 = forms.CharField(widget=forms.PasswordInput(attrs={'class': "form-control", 'style': 'max-width: 300px'}), label='Пароль')
    password2 = forms.CharField(widget=forms.PasswordInput(attrs={'class': "form-control", 'style': 'max-width: 300px'}), label='Повторите пароль')
    
  
    
    class Meta:
        model = SocialUser
        fields = ('username', 'password1', 'password2')  
        
