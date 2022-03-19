from rest_framework import serializers

from developers.serializers import DeveloperModelSerializer
from .models import Project, ToDo


class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"


class ToDoSerializer(serializers.HyperlinkedModelSerializer):
    project = ProjectSerializer()
    creator = DeveloperModelSerializer()
    class Meta:
        model = ToDo
        # exclude = ["active"]
        fields = "__all__"
