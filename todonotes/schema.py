import graphene
from graphene import ObjectType
from graphene_django import DjangoObjectType

from developers.models import Developer
from todo.models import ToDo, Project


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'

class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class DeveloperType(DjangoObjectType):
    class Meta:
        model = Developer
        fields = '__all__'


class DeveloperMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        uuid = graphene.UUID()

    developer = graphene.Field(DeveloperType)

    @classmethod
    def mutate(cls, root, info, username, uuid):
        developer = Developer.objects.get(pk=uuid)
        developer.username = username
        developer.save()
        return DeveloperMutation(developer=developer)


class Mutation(graphene.ObjectType):
    update_developer = DeveloperMutation.Field()


class Query(ObjectType):
    all_projects = graphene.List(ProjectType)
    todos_by_creator_last_name = graphene.List(ToDoType, last_name=graphene.String(required=False))
    developer_by_uuid = graphene.Field(DeveloperType, uuid=graphene.String(required=True))
    all_todos = graphene.List(ToDoType)
    all_developers = graphene.List(DeveloperType)

    def resolve_all_developers(self, info):
        return Developer.objects.all()

    def resolve_all_todos(self, info):
        return ToDo.objects.all()

    def resolve_all_projects(self, info):
        return Project.objects.all()

    def resolve_todos_by_creator_last_name(self, info, last_name=None):
        todos = ToDo.objects.all()
        if last_name:
            todos = todos.filter(creator__last_name=last_name)
        return todos

    def resolve_developer_by_uuid(self, info, uuid):
        try:
            return Developer.objects.get(uuid=uuid)
        except Developer.DoesNotExist:
            return None


schema = graphene.Schema(query=Query, mutation=Mutation)
