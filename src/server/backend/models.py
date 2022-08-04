from unittest.util import _MAX_LENGTH
from django.db import models
from django.forms import CharField
from django_mysql.models import ListCharField
from django.contrib.auth.models import AbstractUser
from viewflow.fields import CompositeKey

# Create your models here.
from django.http import HttpResponse

class User(AbstractUser):
    phone = models.CharField(max_length=10, default="")
    dob = models.DateField(default="1800-01-01")
    years_playing = models.SmallIntegerField(default=0)
    job = models.CharField(max_length=30, default="")
    bio = models.CharField(max_length=1000, default="")
    photo = models.ImageField(default="")
    interests = ListCharField(base_field=models.CharField(max_length=100), max_length=100, default=[])
    rating = models.SmallIntegerField(default=0)
    lichess = models.CharField(max_length=100, default="")
    zoom = models.CharField(max_length=100, default="") #Zoom ID or email    

    def _str_(self):
        return self.username

class Meeting(models.Model):
    player1 = models.ForeignKey('User', related_name='user1', on_delete=models.CASCADE, default='')
    player2 = models.ForeignKey('User', related_name='user2', on_delete=models.CASCADE, default='')
    time = models.DateTimeField(default="")
    lichess = models.CharField(max_length=200, default="")
    zoom = models.CharField(max_length=200, default="")    

    def _str_(self):
        return self.players + self.time

# class MeetingRequest(models.Model):
#     id = CompositeKey(columns=['sender', 'recipient'])
#     sender = models.ForeignKey('User', on_delete=models.CASCADE, related_name='coming_from')
#     recipient = models.ForeignKey('User', on_delete=models.CASCADE, related_name='going_to')
#     time = models.DateTimeField(default="")
#     message = models.CharField(max_length=1000, default="")  

class MeetingRequest(models.Model):
    sender = models.ForeignKey('User', on_delete=models.CASCADE, related_name='coming_from', null="true")
    recipient = models.ForeignKey('User', on_delete=models.CASCADE, related_name='going_to', null="true")
    time = models.DateTimeField(default="")
    message = models.CharField(max_length=1000, default="") 

class Professional(models.Model):
    phone = models.CharField(max_length=10, default="")
    bio = models.CharField(max_length=1000, default="")
    photo = models.ImageField(default="")
    rating = models.SmallIntegerField(default=0)
    years_teaching = models.FloatField(default=0)

class Tournament(models.Model):
    organizer = models.OneToOneField('Professional', on_delete=models.CASCADE)
    time = models.DateTimeField()
    description = models.CharField(max_length=1000, default="")
    entry_fee = models.SmallIntegerField(default=0)
    min_rating =  models.SmallIntegerField(default=-1)
    max_rating =  models.SmallIntegerField(default=-1)

class Lesson(models.Model):
    organizer = models.OneToOneField('Professional', on_delete=models.CASCADE)
    time = models.DateTimeField()
    description = models.CharField(max_length=1000, default="")
    min_rating =  models.SmallIntegerField(default=-1)
    max_rating =  models.SmallIntegerField(default=-1)
    min_age =  models.SmallIntegerField(default=-1)
    max_age =  models.SmallIntegerField(default=-1)
    avg_class_size = models.SmallIntegerField(default=-1)
    
class Message(models.Model):
    name = models.CharField(max_length=100, default="")
    email = models.CharField(max_length=100, default="")
    subject = models.CharField(max_length=100, default="")
    message = models.CharField(max_length=1000, default="")

# class LoginToken(models.Model):
#     token = models.CharField(max_length=200)
