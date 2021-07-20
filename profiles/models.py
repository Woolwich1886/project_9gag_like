from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.fields import TextField, CharField

# Create your models here.



class SocialUser(AbstractUser):
    first_name = CharField(blank=True, null=True, max_length=20, verbose_name='Имя')
    second_name = CharField(blank=True, null=True, max_length=20, verbose_name='Фамилия')
    bio = models.TextField(blank=True, null=True, max_length=300, verbose_name='О себе')
    country = models.TextField(choices=[('РФ', 'РФ'), 
                                        ('Казахстан','Казахстан'), 
                                        ('США','США'), 
                                        ('Великобритания','Великобритания')], 
                                        blank=True, null=True, verbose_name='Гранжданство')


    def __str__(self):
        return self.username
    
