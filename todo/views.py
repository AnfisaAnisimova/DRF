from rest_framework import status, permissions
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .filters import ToDoFilter
from .models import Project, ToDo
from .serializers import ProjectSerializer, ToDoSerializer


class ProjectPagination(PageNumberPagination):
    page_size = 10


class ToDoPagination(PageNumberPagination):
    page_size = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = ProjectPagination

    def get_queryset(self):
        name = self.request.query_params.get("name", "")
        projects = Project.objects.all()
        if name:
            projects = projects.filter(name__contains=name)
        return projects


class ToDoModelViewSet(ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    pagination_class = ToDoPagination
    filterset_class = ToDoFilter

    def destroy(self, request, pk=None):
        try:
            task = ToDo.objects.get(pk=pk)
            task.active = False
            task.save()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
