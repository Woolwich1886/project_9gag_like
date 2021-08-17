from django import forms
from .models import Post, Category


# Выбор категории при создании поста
PICK_A_CATEGORY = [
    ('','------'),
    ('music', 'Музыка'),
    ('sport', 'Спорт'),
    ('serials', 'Сериалы'),
]


# Форма для создания поста
class PostForm(forms.ModelForm):
    title = forms.CharField(max_length=100, widget=forms.TextInput(attrs={
                                                            'class': 'form-control',
                                                            'placeholder': 'Введите название'                                                   
    }), label='Название')
    category = forms.ChoiceField(choices=PICK_A_CATEGORY, label='Категория', widget=forms.Select(attrs={
                                                                                            'class': 'form-control',
                                                                                            'placeholder': '----'
    }))
    class Meta:
        model = Post
        fields = ('title', 'category', 'image')

    def clean_title(self):
        title = self.cleaned_data.get('title')
        if len(title) > 100:
            raise forms.ValidationError("Слишком длинное название, попробуйте короче")
        return title

    def clean_category(self):
        category = self.cleaned_data.get('category')
        return Category.objects.filter(name=category).first()



