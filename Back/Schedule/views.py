from rest_framework import viewsets
from .models import Schedule
from .serializers import ScheduleSerializer
from rest_framework import permissions

class ScheduleViewSet(viewsets.ModelViewSet):
    serializer_class = ScheduleSerializer
    queryset = Schedule.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
  
    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)

        existing_schedule = Schedule.objects.filter(class_number=serializer.validated_data.get('class_number'), user=serializer.validated_data.get('user'), day_of_week=serializer.validated_data.get('day_of_week')).first()
        
        if existing_schedule:
            existing_schedule.day_of_week = serializer.validated_data.get('day_of_week')
            existing_schedule.subject = serializer.validated_data.get('subject')
            existing_schedule.class_number = serializer.validated_data.get('class_number')
            existing_schedule.save()
        else:
            super().perform_create(serializer)
