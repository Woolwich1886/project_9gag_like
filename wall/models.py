from django.db import models
from django.conf import settings


User = settings.AUTH_USER_MODEL
# Create your models here.


# Модель категории
class Category(models.Model):
    name = models.CharField(max_length=20, verbose_name='Категория')
    read_name = models.CharField(max_length=20, verbose_name='Читабельное название', blank=True, null=True)


    def __str__(self):
        return self.name


    class Meta:
        verbose_name_plural = 'Категории'
        verbose_name = 'Категория'
        ordering = ['name']


# Модель поста
class Post(models.Model):
    title = models.CharField(max_length=100, verbose_name='Название поста')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name='Категория', null=False)
    image = models.ImageField(verbose_name='Изображение', upload_to='')
    pub_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата публикации')
    user = models.ForeignKey(User, related_name='my_posts', on_delete=models.CASCADE, verbose_name='Автор поста')
    upvotes = models.ManyToManyField(User, related_name='user_upvotes', blank=True, through='Upvote')
    downvotes = models.ManyToManyField(User, related_name='user_downvotes', blank=True, through='Downvote')


    def __str__(self):
        return self.title
    
    
    class Meta:
        verbose_name_plural = 'Посты'
        verbose_name = 'Пост'
        ordering = ['-id'] # сперва новые посты (сортировка по id, а не по дате)


# Модель апвоутов
class Upvote(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE,)
    up_date = models.DateTimeField(auto_now_add=True)
    up_update = models.DateTimeField(auto_now=True)


    def __str__(self):
        return ('Пользователь: '+ self.user.username + ', пост: ' + self.post.title)


# Модель даунвоутов
class Downvote(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    down_date = models.DateTimeField(auto_now_add=True)
    down_update = models.DateTimeField(auto_now=True)


    def __str__(self):
        return ('Пользователь: '+ self.user.username + ', пост: ' + self.post.title)


# Модель комментария
class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment_date = models.DateTimeField(auto_now_add=True)
    text = models.CharField(max_length=200, verbose_name='текст комментария', null=False)


    class Meta:
        verbose_name_plural = 'Комментарии'
        verbose_name = 'Комментарий'