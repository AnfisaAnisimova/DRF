from django.db import models
from developers.models import Developer


class Project(models.Model):
    name = models.CharField(max_length=64, unique=True)
    repo = models.URLField(max_length=200, blank=True)
    developers = models.ManyToManyField(Developer)

    def __str__(self):
        return self.name


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    creator = models.ForeignKey(Developer, on_delete=models.PROTECT)
    active = models.BooleanField(default=True)
