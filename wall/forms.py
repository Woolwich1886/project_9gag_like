from django import forms
from django.forms import widgets
from .models import Post, Category


class PostForm(forms.ModelForm):
    title = forms.CharField(max_length=100, widget=forms.TextInput(attrs={
                                                            'class': 'form-control',
                                                            'placeholder': 'Введите название'                                                   
    }), label='Название')
    class Meta:
        model = Post
        fields = ('title', 'category', 'image')

    def clean_title(self):
        title = self.cleaned_data.get('title')
        if len(title) > 100:
            raise forms.ValidationError("Слишком длинное название, попробуйте короче")
        return title






