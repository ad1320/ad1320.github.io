from rest_framework import viewsets
from .serializers import *
from .models import *
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
import json
import requests
from rest_framework import status
from rest_framework.response import Response
from django.core import serializers

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class MeetingView(viewsets.ModelViewSet):
    serializer_class = MeetingSerializer
    queryset = Meeting.objects.all()

class MeetingRequestView(viewsets.ModelViewSet):
    serializer_class = MeetingRequestSerializer
    queryset = MeetingRequest.objects.all()

# @api_view(['POST'])
# def create_user(req):
#     username = json.loads(req.body).get('username')
#     password = json.loads(req.body).get('password')

#     if username is None or password is None:
#         print("more info")
#         return JsonResponse({'detail': 'Please provide username and password.'}, status=400)    

#     user = User.objects.filter(username=username).exists()

#     if not user:
#         User.objects.create(username=username, password=password)
#         print("User created successfully")
#         return JsonResponse({'detail': 'User created successfully'}, status=200)
#     else:
#         print("User already exists; try a different username.")
#         return JsonResponse({'detail': 'User already exists; try a different username.'}, status=400) 


@api_view(['POST'])
def auth(req):
    username = json.loads(req.body).get('username')
    password = json.loads(req.body).get('password')

    if username is None or password is None:
        print("more info")
        return JsonResponse({'detail': 'Please provide username and password.'}, status=400)    

    exists = authenticate(username=username, password=password)

    if exists is not None:
        print("invalid login")
        return JsonResponse({'detail': 'Invalid credentials.'}, status=400)

    user = User.objects.filter(username=username)[0]
    
    return JsonResponse({'detail': 'Successfully logged in.', 'id': user.id})

# @ensure_csrf_cookie
# def session(req):
#     if not req.user.is_authenticated:
#         return JsonResponse({'isAuthenticated': False}) 

#     return JsonResponse({'isAuthenticated': True})

@api_view(['POST'])
def create_lichess(req):
    print("here")
    res = json.loads(requests.post("https://lichess.org/api/challenge/open", {rated: false, variant: "standard"}))
    return Response({url: res.url}, status=200)

@api_view(['POST'])
def create_zoom(req):
    print("here")
    zoomId = json.loads(req.body).get('zoom')
    raw = requests.post("https://api.zoom.us/v2/users/" + zoomId + "/meetings")
    print(raw)
    res = json.loads(raw) #{agenda: "ChessPal Meeting"}
    print(Response({url: res.join_url}, status=200))
    return Response({url: res.join_url}, status=200)

@api_view(['POST'])
def get_meeting_reqs(req):
    print(repr(MeetingRequestSerializer()))
    data = MeetingRequest.objects.filter(recipient=json.loads(req.body).get('id'))
    serial = serializers.serialize('json', data)
    print(serial)
    return Response(serial, status=200)

@api_view(['POST'])
def get_meetings(req):
    user = json.loads(req.body).get('id')
    p1 = Meeting.objects.filter(player1=user)
    p2 = Meeting.objects.filter(player2=user)
    data = p1 | p2
    serial = serializers.serialize('json', data)
    return Response(serial, status=200)

@api_view(['POST'])
def change_meeting(req):
    data = json.loads(req.body)
    meeting = Meeting.objects.get(id=data.get('id'))
    if data.get('change') == 'zoom':
        meeting.zoom = data['zoom']
    if data.get('change') == 'lichess':
        meeting.lichess = data['lichess']
    meeting.save()
    return Response(status=200)