from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from .models import Developer
from .serializers import DeveloperModelSerializer, DeveloperModelSerializerWithUserStatus


class DeveloperModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                            mixins.CreateModelMixin, GenericViewSet):
    queryset = Developer.objects.all()
    serializer_class = DeveloperModelSerializer

    def get_serializer_class(self):
        if self.request.version == '1':
            return DeveloperModelSerializerWithUserStatus
        return DeveloperModelSerializer


