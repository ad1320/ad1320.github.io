# Generated by Django 4.0.4 on 2022-06-18 10:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0013_requestmeeting_message_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='requestmeeting',
            name='recipient',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='requestmeeting',
            name='sender',
            field=models.CharField(default='', max_length=200),
        ),
    ]