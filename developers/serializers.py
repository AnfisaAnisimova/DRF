from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Developer


class DeveloperModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Developer
        fields = '__all__'
