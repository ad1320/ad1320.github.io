from backend import views
from django.urls import path, include
from django.contrib import admin
from rest_framework import routers



router = routers.DefaultRouter()
router.register(r'user', views.UserView, 'user')

urlpatterns = [
    path('login/', views.auth, name='api-login'),
    path('getmeetingreqs/', views.get_meeting_reqs, name='api-meetingreqs'),
    path('getmeetings/', views.get_meetings, name='api-meetings'),
    path('changemeeting/', views.change_meeting, name='api-changemeeting'),
    path('createzoom/', views.create_zoom, name='api-createzoom')
    # path('session/', views.session, name='api-session'),
]