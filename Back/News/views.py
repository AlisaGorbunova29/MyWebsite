from rest_framework import viewsets
from .models import News
from .serializers import NewsSerializer
from rest_framework import permissions


class NewsViewSet(viewsets.ModelViewSet):
    serializer_class = NewsSerializer
    queryset = News.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)

        return super().perform_create(serializer)
  
