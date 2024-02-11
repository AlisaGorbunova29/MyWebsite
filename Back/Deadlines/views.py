from rest_framework import viewsets
from .models import Deadline
from .serializers import DeadlineSerializer
from rest_framework import permissions


class DeadlineViewSet(viewsets.ModelViewSet):
    serializer_class = DeadlineSerializer
    queryset = Deadline.objects.all().order_by('deadline_date')
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)

        return super().perform_create(serializer)
  
