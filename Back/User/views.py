from rest_framework import viewsets, mixins, views, response
from .models import User
from .serializers import UserSerializer

class UserViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
  serializer_class = UserSerializer
  queryset = User.objects.all()

  

class UserCurrent(views.APIView):
  def get(self, request):
    serializer = UserSerializer(request.user)
    return response.Response(serializer.data)
