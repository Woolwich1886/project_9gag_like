# Generated by Django 3.2.5 on 2021-08-06 02:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wall', '0003_auto_20210802_0833'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comment',
            options={'verbose_name': 'Комментарий', 'verbose_name_plural': 'Комментарии'},
        ),
    ]
