# Generated by Django 3.2.6 on 2021-08-19 00:29

import blog.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='excerpt',
        ),
        migrations.AddField(
            model_name='post',
            name='image',
            field=models.ImageField(blank=True, default='posts/default.jpg', upload_to=blog.models.upload_to, verbose_name='Image'),
        ),
        migrations.AddField(
            model_name='post',
            name='rating',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
