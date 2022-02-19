from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from .models import Developer
from .serializers import DeveloperModelSerializer


class DeveloperModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    queryset = Developer.objects.all()
    serializer_class = DeveloperModelSerializer
