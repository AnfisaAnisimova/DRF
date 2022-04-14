from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Developer


class DeveloperModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Developer
        fields = ('username', 'email')


class DeveloperModelSerializerWithUserStatus(HyperlinkedModelSerializer):
    class Meta:
        model = Developer
        fields = ('username', 'email', 'first_name', 'last_name', 'is_superuser', 'is_staff')


