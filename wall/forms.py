from django import forms
from .models import Post, Category


class PostForm(forms.ModelForm):
    title = forms.CharField(label='Название поста')
    category = forms.ModelChoiceField(queryset=Category.objects.all(), label='Категория')


class Meta:
    model = Post
    fields = ('title', 'category', 'pub_date', 'author')
    
    def title_len(self):
        title = self.cleaned_data.get('title')
        if len(title) > 30:
            raise forms.ValidationError("Слишком длинное название, попробуйте короче")
        return title

