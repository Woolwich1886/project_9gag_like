# Generated by Django 3.2.5 on 2021-07-30 04:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20, verbose_name='Категория')),
            ],
            options={
                'verbose_name': 'Категория',
                'verbose_name_plural': 'Категории',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Downvote',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('down_date', models.DateTimeField(auto_now_add=True)),
                ('down_update', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, verbose_name='Название поста')),
                ('image', models.ImageField(upload_to='', verbose_name='Изображение')),
                ('pub_date', models.DateTimeField(auto_now_add=True, verbose_name='Дата публикации')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='my_posts', to=settings.AUTH_USER_MODEL, verbose_name='Автор поста')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wall.category', verbose_name='Категория')),
                ('downvotes', models.ManyToManyField(blank=True, related_name='user_downvotes', through='wall.Downvote', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Пост',
                'verbose_name_plural': 'Посты',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='Upvote',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('up_date', models.DateTimeField(auto_now_add=True)),
                ('up_update', models.DateTimeField(auto_now=True)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wall.post')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='post',
            name='upvotes',
            field=models.ManyToManyField(blank=True, related_name='user_upvotes', through='wall.Upvote', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='downvote',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wall.post'),
        ),
        migrations.AddField(
            model_name='downvote',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
