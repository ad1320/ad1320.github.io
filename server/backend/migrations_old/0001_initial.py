# Generated by Django 4.0.4 on 2022-05-21 00:12

from django.db import migrations, models
import django_mysql.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=30)),
                ('password', models.CharField(max_length=30)),
                ('name', models.CharField(max_length=100)),
                ('dob', models.DateField()),
                ('years_playing', models.FloatField()),
                ('job', models.CharField(max_length=30)),
                ('bio', models.CharField(max_length=1000)),
                ('photo', models.ImageField(upload_to='')),
                ('interests', django_mysql.models.ListCharField(models.CharField(max_length=100), max_length=100, size=None)),
                ('rating', models.SmallIntegerField()),
            ],
        ),
    ]
