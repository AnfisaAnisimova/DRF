from django.db import models
from uuid import uuid4


class Developer(models.Model):
   uuid = models.UUIDField(primary_key=True, default=uuid4())
   username = models.CharField(max_length=64, verbose_name="Никнейм", unique=True)
   first_name = models.CharField(max_length=64, verbose_name="Имя")
   last_name = models.CharField(max_length=64, verbose_name="Фамилия")
   email = models.EmailField(max_length=254, verbose_name="электронная почта", unique=True)
