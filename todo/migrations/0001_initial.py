# Generated by Django 4.0.1 on 2022-02-10 18:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [("developers", "0003_alter_developer_uuid")]

    operations = [
        migrations.CreateModel(
            name="Project",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=64, unique=True)),
                ("repo", models.URLField(blank=True)),
                ("developers", models.ManyToManyField(to="developers.Developer")),
            ],
        ),
        migrations.CreateModel(
            name="ToDo",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("text", models.TextField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("active", models.BooleanField(default=True)),
                ("creator", models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to="developers.developer")),
                ("project", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="todo.project")),
            ],
        ),
    ]
