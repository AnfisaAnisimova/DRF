import json

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from developers.views import DeveloperModelViewSet
from developers.models import Developer
from .models import ToDo, Project


class TestDeveloperModelViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/developers/')
        view = DeveloperModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/developers/', {'username': 'WhoAmI', 'first_name': 'Alex', 'last_name': 'Petrov', 'email': 'whoami@gmail.com'}, format='json')
        view = DeveloperModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/developers/', {'username': 'WhoAmI', 'first_name': 'Alex', 'last_name': 'Petrov', 'email': 'whoami@gmail.com'}, format='json')
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        force_authenticate(request, admin)
        view = DeveloperModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        developer = Developer.objects.create(username='WhoAmI', first_name='Alex', last_name='Petrov', email='whoami@gmail.com')
        client = APIClient()
        response = client.get(f'/api/developers/{developer.uuid}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        developer = Developer.objects.create(username='WhoAmI', first_name='Alex', last_name='Petrov', email='whoami@gmail.com')
        client = APIClient()
        response = client.put(f'/api/developers/{developer.uuid}/', {'username': 'MRX', 'email': 'mrx@gmail.com'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        """Данный тест не проходит. Статус код возвращается 400 вместо 200. Не могу найти причину. """
        developer = Developer.objects.create(username='WhoAmI', first_name='Alex', last_name='Petrov',
                                             email='whoami@gmail.com')
        client = APIClient()
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        client.login(username='admin', password='admin123456')
        response = client.put(f'/api/developers/{developer.uuid}/', {'username': 'MRX', 'email': 'mrx@gmail.com'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        developer = Developer.objects.get(uuid=developer.uuid)
        self.assertEqual(developer.username, 'MRX')
        self.assertEqual(developer.email, 'mrx@gmail.com')
        client.logout()


class TestMath(APISimpleTestCase):
    def test_sqrt(self):
        import math
        self.assertEqual(math.sqrt(4), 2)


class TestToDoViewSet(APITestCase):
    def test_get_list(self):
        response = self.client.get('/api/tasks/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        """
        Данный тест выдаёт ошибку. Думаю проблема в строке где создаётся объект project т.к. в модели
        поле developers имеет отношение многие ко многим. Не понимаю как это прописать при создании объекта
        """
        developer = Developer.objects.create(username='WhoAmI', first_name='Alex', last_name='Petrov',
                                             email='whoami@gmail.com')
        project = Project.objects.create(name='Project 1', developers=developer)
        todo = ToDo.objects.create(project=project, text='Some text', creator=developer)
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        self.client.login(username='admin', password='admin123456')
        response = self.client.put(f'/api/tasks/{todo.id}/', {'name': 'Other text', 'creator': todo.creator.uuid})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = ToDo.objects.get(id=todo.id)
        self.assertEqual(todo.name, 'Other text')

    def test_edit_admin_with_mixer(self):
        """Данный тест не проходит. Статус код возвращается 400 вместо 200. Не могу найти причину. """
        todo = mixer.blend(ToDo)

        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        self.client.login(username='admin', password='admin123456')

        response = self.client.put(f'/api/tasks/{todo.id}/', {'name': 'blabla', 'creator': todo.creator.uuid})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = ToDo.objects.get(id=todo.id)
        self.assertEqual(todo.name, 'blabla')

    def test_get_detail(self):
        todo = mixer.blend(ToDo, text='My task')
        response = self.client.get(f'/api/tasks/{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_todo = json.loads(response.content)
        self.assertEqual(response_todo['text'], 'My task')

    def test_get_detail_author(self):
        todo = mixer.blend(ToDo, creator__username='WhoAmI')
        response = self.client.get(f'/api/tasks/{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_todo = json.loads(response.content)
        self.assertEqual(response_todo['creator']['username'], 'WhoAmI')
