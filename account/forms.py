from .models import Account
from django import forms
from django.core import validators
from django.contrib.auth import REDIRECT_FIELD_NAME, get_user_model
# для обращения к objects.all или objects.filter(...)
User = get_user_model()

# Форма для редактирования Аватарки


class ChangeProfileBadgeForm(forms.ModelForm):
    prof_image = forms.ImageField(widget=forms.FileInput(attrs={
        'style': 'display: none',
        'class': 'form-control',
    }), label="Аватар")

    class Meta:
        model = Account
        fields = ('prof_image',)


# Форма для редактирования Аккаунта
class EditProfileForm(forms.ModelForm):
    first_name = forms.CharField(max_length=20, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Введите имя'

    }), label='Имя', validators=[validators.RegexValidator(
        regex=r'^[a-zA-Zа-яА-Я]+$',
        message='В имени цифры недопустимы',
        code='invalid_format')])
    second_name = forms.CharField(max_length=20, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Введите фамилию'

    }), label='Фамилия', localize=True, validators=[validators.RegexValidator(
        regex=r'^[a-zA-Zа-яА-Я]+$',
        message='В фамилии цифры недопустимы',
        code='invalid_format')])
    about = forms.CharField(max_length=200, widget=forms.Textarea(attrs={
        'style': 'resize: none; height: 200px'
    }), label='Обо мне', required=False)

    class Meta:
        model = Account
        fields = '__all__'
        exclude = ['user', 'prof_image']

# Форма для входа


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

# Форма для регистрации


class RegistrationForm(forms.Form):
    username = forms.CharField(max_length=20, widget=forms.TextInput(attrs={
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
    first_name = forms.CharField(max_length=20, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Введите имя'

    }), label='Имя', validators=[validators.RegexValidator(
        regex=r'^[a-zA-Zа-яА-Я]+$',
        message='В имени цифры недопустимы',
        code='invalid_format')])
    second_name = forms.CharField(max_length=20, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Введите фамилию'

    }), label='Фамилия', validators=[validators.RegexValidator(
        regex=r'^[a-zA-Zа-яА-Я]+$',
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
            raise forms.ValidationError(
                "Этот логин уже занят, выберите другой")
        return username
