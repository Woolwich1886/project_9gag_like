from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import SocialUser

class SocialUserCreationForm(UserCreationForm):

    class Meta:
        model = SocialUser
        fields = '__all__'

class SocialUserChangeForm(UserChangeForm):

    class Meta:
        model = SocialUser
        fields = '__all__'