from django.db import models
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
    image = models.ImageField(verbose_name='Изображение', upload_to='')
    pub_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата публикации')
    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Автор поста')
    rating = models.ManyToManyField(User, related_name='votes', blank=True)
    upvotes = models.IntegerField(default='0')
    downvotes = models.IntegerField(default='0')


    def __str__(self):
        return self.title


    class Meta:
        verbose_name_plural = 'Посты'
        verbose_name = 'Пост'
        ordering = ['-id'] # сперва новые посты (сортировка по id, а не по дате)