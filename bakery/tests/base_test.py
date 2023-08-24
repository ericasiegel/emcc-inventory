
from django.contrib.auth.models import User
from rest_framework.test import APIClient
import pytest


@pytest.fixture
def authenticated_client():
    client = APIClient()
    user = User.objects.create_user(username='testuser', password='testpassword')
    client.force_authenticate(user=user)
    return client
