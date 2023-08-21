
from django.contrib.auth.models import User
from rest_framework.test import APIClient
import pytest

from bakery.models import Cookie, Location

@pytest.fixture
def authenticated_client():
    client = APIClient()
    user = User.objects.create_user(username='testuser', password='testpassword')
    client.force_authenticate(user=user)
    return client

@pytest.fixture
def cookie_data():
    test_cookie = Cookie.objects.create(name='testingCookie')
    test_location = Location.objects.create(title='testing location')

    data = {
        "cookie_name": test_cookie.pk,
        "size": "mega",
        "quantity": 1,
        "location_name": test_location.pk
    }
    return data

# class BaseTest:
#     # @pytest.fixture
#     # def client(self, authenticated_client):
#     #     return authenticated_client
#     @pytest.fixture
#     def authenticated_client():
#         client = APIClient()
#         user = User.objects.create_user(username='testuser', password='testpassword')
#         client.force_authenticate(user=user)
#         return client

#     @pytest.fixture
#     def cookie_data():
#         test_cookie = Cookie.objects.create(name='testingCookie')
#         test_location = Location.objects.create(title='testing location')

#         data = {
#             "cookie_name": test_cookie.pk,
#             "size": "mega",
#             "quantity": 1,
#             "location_name": test_location.pk
#         }
#         return data