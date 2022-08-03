# Generated by Django 4.0.4 on 2022-06-24 17:28

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import django_mysql.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('phone', models.CharField(default='', max_length=10)),
                ('dob', models.DateField(default='1800-01-01')),
                ('years_playing', models.SmallIntegerField(default=0)),
                ('job', models.CharField(default='', max_length=30)),
                ('bio', models.CharField(default='', max_length=1000)),
                ('photo', models.ImageField(default='', upload_to='')),
                ('interests', django_mysql.models.ListCharField(models.CharField(max_length=100), default=[], max_length=100, size=None)),
                ('rating', models.SmallIntegerField(default=0)),
                ('lichess', models.CharField(default='', max_length=100)),
                ('zoom', models.CharField(default='', max_length=100)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Professional',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone', models.CharField(default='', max_length=10)),
                ('bio', models.CharField(default='', max_length=1000)),
                ('photo', models.ImageField(default='', upload_to='')),
                ('rating', models.SmallIntegerField(default=0)),
                ('years_teaching', models.FloatField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Tournament',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField()),
                ('description', models.CharField(default='', max_length=1000)),
                ('entry_fee', models.SmallIntegerField(default=0)),
                ('min_rating', models.SmallIntegerField(default=-1)),
                ('max_rating', models.SmallIntegerField(default=-1)),
                ('organizer', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='backend.professional')),
            ],
        ),
        migrations.CreateModel(
            name='MeetingRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField(default='')),
                ('message', models.CharField(default='', max_length=1000)),
                ('recipient', models.ForeignKey(null='true', on_delete=django.db.models.deletion.CASCADE, related_name='going_to', to=settings.AUTH_USER_MODEL)),
                ('sender', models.ForeignKey(null='true', on_delete=django.db.models.deletion.CASCADE, related_name='coming_from', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Meeting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField()),
                ('lichess', models.CharField(default='', max_length=200)),
                ('zoom', models.CharField(default='', max_length=200)),
                ('players', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Lesson',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField()),
                ('description', models.CharField(default='', max_length=1000)),
                ('min_rating', models.SmallIntegerField(default=-1)),
                ('max_rating', models.SmallIntegerField(default=-1)),
                ('min_age', models.SmallIntegerField(default=-1)),
                ('max_age', models.SmallIntegerField(default=-1)),
                ('avg_class_size', models.SmallIntegerField(default=-1)),
                ('organizer', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='backend.professional')),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='meetings',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='backend.meeting'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions'),
        ),
    ]
