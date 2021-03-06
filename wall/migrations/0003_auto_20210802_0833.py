# Generated by Django 3.2.5 on 2021-08-02 08:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('wall', '0002_alter_downvote_post'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='wall.post'),
        ),
        migrations.AlterField(
            model_name='downvote',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wall.post'),
        ),
    ]
