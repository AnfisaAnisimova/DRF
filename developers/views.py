from rest_framework.viewsets import ModelViewSet
from .models import Developer
from .serializers import DeveloperModelSerializer


class DeveloperModelViewSet(ModelViewSet):
    queryset = Developer.objects.all()
    serializer_class = DeveloperModelSerializer
