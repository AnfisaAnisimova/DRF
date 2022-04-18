from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import permissions
from rest_framework.routers import DefaultRouter
from developers.views import DeveloperModelViewSet
from todo.views import ProjectModelViewSet, ToDoModelViewSet
from rest_framework.authtoken import views
from graphene_django.views import GraphQLView

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="ToDoNotes",
        default_version='0.1',
        description="Documentation to our project",
        contact=openapi.Contact(email="admin@admin.local"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)


router = DefaultRouter()
router.register("developers", DeveloperModelViewSet)
router.register("projects", ProjectModelViewSet)
router.register("tasks", ToDoModelViewSet)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token),
    # path('api/v<int:version>/developers/', DeveloperModelViewSet.as_view({'get': 'list'})),
    # path('api/developers/0.1', include('developers.urls', namespace='0.1')),
    # path('api/developers/0.2', include('developers.urls', namespace='0.2')),
    path('api/developers/', DeveloperModelViewSet.as_view({'get': 'list'})),

    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path("graphql/", GraphQLView.as_view(graphiql=True)),
]
