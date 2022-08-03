# Generated by Django 4.0.4 on 2022-06-20 00:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0030_remove_meetingrequest_recipient_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='meetingrequest',
            name='recipient',
            field=models.ForeignKey(null='true', on_delete=django.db.models.deletion.CASCADE, related_name='going_to', to=settings.AUTH_USER_MODEL),
            preserve_default='true',
        ),
        migrations.AddField(
            model_name='meetingrequest',
            name='sender',
            field=models.ForeignKey(null='true', on_delete=django.db.models.deletion.CASCADE, related_name='coming_from', to=settings.AUTH_USER_MODEL),
            preserve_default='true',
        ),
        migrations.AddField(
            model_name='meetingrequest',
            name='time',
            field=models.DateTimeField(default=''),
        ),
    ]
