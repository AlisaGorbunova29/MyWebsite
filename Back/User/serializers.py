from rest_framework import serializers
from .models import User
from Deadlines.serializers import DeadlineSerializer
from Schedule.serializers import ScheduleSerializer
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    deadline_set = DeadlineSerializer(read_only = True, many = True)
    schedule_set = ScheduleSerializer(read_only = True, many = True)

    def validate_password(self, value: str) -> str:
        return make_password(value)
        
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'first_name', 'last_name', 'avatar', 'deadline_set', 'schedule_set']
        extra_kwargs =  {'password': {'write_only': True}}

