# Generated by Django 3.2.6 on 2021-08-28 02:34

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0007_alter_post_published'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='published',
            field=models.DateTimeField(default=datetime.datetime(2021, 8, 28, 2, 34, 39, 899255, tzinfo=utc)),
        ),
    ]