from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from developers.views import DeveloperModelViewSet
from todo.views import ProjectModelViewSet, ToDoModelViewSet
from rest_framework.authtoken import views

router = DefaultRouter()
router.register("developers", DeveloperModelViewSet)
router.register("projects", ProjectModelViewSet)
router.register("tasks", ToDoModelViewSet)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token),
]
