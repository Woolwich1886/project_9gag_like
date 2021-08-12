from django import forms
from django.forms import widgets
from .models import Post, Category


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ('title', 'category', 'image')

    def clean_title(self):
        title = self.cleaned_data.get('title')
        if len(title) > 100:
            raise forms.ValidationError("Слишком длинное название, попробуйте короче")
        return title

#class PostForm(forms.ModelForm):
#    title = forms.CharField(label='Название поста')
#    category = forms.ModelChoiceField(queryset=Category.objects.all(), label='Категория')




