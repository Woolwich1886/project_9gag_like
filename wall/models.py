from django.db import models
from django.db.models.fields import DateField
from django.db.models.fields.files import ImageField
from django.conf import settings

User = settings.AUTH_USER_MODEL
# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=20, verbose_name='Категория')


    def __str__(self):
        return self.name


    class Meta:
        verbose_name_plural = 'Категории'
        verbose_name = 'Категория'
        ordering = ['name']




class Post(models.Model):
    title = models.CharField(max_length=100, verbose_name='Название поста')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name='Категория', null=False)
    #image = ImageField()
    pub_date = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Автор поста')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Посты'
        verbose_name = 'Пост'
        ordering = ['-id'] # сперва новые посты (сортировка по id, а не по дате)