# Generated by Django 4.0.4 on 2022-06-11 06:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_user_email_user_phone'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='bio',
        ),
        migrations.RemoveField(
            model_name='user',
            name='dob',
        ),
        migrations.RemoveField(
            model_name='user',
            name='interests',
        ),
        migrations.RemoveField(
            model_name='user',
            name='job',
        ),
        migrations.RemoveField(
            model_name='user',
            name='name',
        ),
        migrations.RemoveField(
            model_name='user',
            name='photo',
        ),
        migrations.RemoveField(
            model_name='user',
            name='rating',
        ),
        migrations.RemoveField(
            model_name='user',
            name='years_playing',
        ),
    ]
