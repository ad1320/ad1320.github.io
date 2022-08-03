from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        
class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = "__all__"

class MeetingRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingRequest
        fields = ['sender', 'recipient', 'time', 'message']
# class LoginTokenSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = LoginToken
#         fields = ('token')