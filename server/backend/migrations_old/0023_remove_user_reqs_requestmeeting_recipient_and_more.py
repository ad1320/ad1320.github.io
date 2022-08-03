# Generated by Django 4.0.4 on 2022-06-19 20:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0022_remove_requestmeeting_recipient_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='reqs',
        ),
        migrations.AddField(
            model_name='requestmeeting',
            name='recipient',
            field=models.CharField(max_length=200, null='true'),
            preserve_default='true',
        ),
        migrations.AddField(
            model_name='requestmeeting',
            name='sender',
            field=models.CharField(max_length=200, null='true'),
            preserve_default='true',
        ),
        migrations.AddField(
            model_name='requestmeeting',
            name='time',
            field=models.DateTimeField(null='true'),
            preserve_default='true',
        ),
    ]
