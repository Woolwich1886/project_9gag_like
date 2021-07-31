from django.db import models
from django.conf import settings
from django.db.models.enums import Choices
from django.db.models.fields.related import OneToOneField

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
    image = models.ImageField(verbose_name='Изображение', upload_to='')
    pub_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата публикации')
    author = models.ForeignKey(User, related_name='my_posts', on_delete=models.CASCADE, verbose_name='Автор поста')
    upvotes = models.ManyToManyField(User, related_name='user_upvotes', blank=True, through='Upvote')
    downvotes = models.ManyToManyField(User, related_name='user_downvotes', blank=True, through='Downvote')


    def __str__(self):
        return self.title
    
    

    class Meta:
        verbose_name_plural = 'Посты'
        verbose_name = 'Пост'
        ordering = ['-id'] # сперва новые посты (сортировка по id, а не по дате)


class Upvote(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE,)
    up_date = models.DateTimeField(auto_now_add=True)
    up_update = models.DateTimeField(auto_now=True)

    def __str__(self):
        return ('Пользователь: '+ self.user.username + ', пост: ' + self.post.title)


class Downvote(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    down_date = models.DateTimeField(auto_now_add=True)
    down_update = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.post