# Generated by Django 4.0.1 on 2022-01-23 13:15

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('developers', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='developer',
            name='id',
        ),
        migrations.AddField(
            model_name='developer',
            name='uuid',
            field=models.UUIDField(default=uuid.UUID('3b4b43ca-d8b8-4072-9fc2-e4280743ec9d'), primary_key=True, serialize=False),
        ),
    ]
