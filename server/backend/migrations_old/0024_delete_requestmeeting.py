# Generated by Django 4.0.4 on 2022-06-19 20:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0023_remove_user_reqs_requestmeeting_recipient_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='RequestMeeting',
        ),
    ]
