import pytest
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.models import User
from bakery.models import Cookie, Location

@pytest.fixture
def cookie_data():
    test_cookie = Cookie.objects.create(name = 'testingCookie')
    test_location = Location.objects.create(title = 'testing location')
    
    data = {
        "cookie_name": test_cookie.pk,
        "size": "mega",
        "quantity": 1,
        "location_name": test_location.pk
    }
    return data
        

@pytest.mark.django_db
class TestCreateBakedCookie:
    def test_if_user_is_anonymous_returns_401(self, cookie_data):
        
        client = APIClient()
        response = client.post('/bakery/bakedcookies/', cookie_data)
        
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
    
    def test_if_required_fields_are_not_null_returns_400(self, cookie_data):
        client = APIClient()
        test_user = User.objects.create_user(username='testuser', password='testpassword')
        client.force_authenticate(user=test_user)
    
        # Assuming data is defined somewhere before this
        for key in cookie_data.keys():
            modified_data = {k: v for k, v in cookie_data.items() if k != key}
            response = client.post('/bakery/bakedcookies/', modified_data)
        
            print(f"Status code for missing {key}: {response.status_code}")
        
            # Check for a 400 BAD REQUEST response for missing mandatory keys
            assert response.status_code == status.HTTP_400_BAD_REQUEST, f"Failed for missing key: {key}"
        
            # If you expect certain error messages or details in the response for missing keys
            assert key in response.data, f"Key {key} not found in response data"
            assert response.data[key] is not None, f"Value for key {key} in response data is None"

    def test_if_cookie_posted_successfully_returns_201(self, cookie_data):
        client = APIClient()
        test_user = User.objects.create_user(username='testuser', password='testpassword')
        client.force_authenticate(user=test_user)
        # Create a Cookie and Location object (or whatever your models are named)
        response = client.post('/bakery/bakedcookies/', cookie_data)
        
        
        assert response.status_code == status.HTTP_201_CREATED

@pytest.mark.django_db
class TestUpdateBakedCookie:
    def test_update_location_and_quantity_returns_200(self, cookie_data):
        client = APIClient()
        test_user = User.objects.create_user(username='testuser', password='testpassword')
        client.force_authenticate(user=test_user)
        
        # Create the BakedCookie instance with the data from cookie_data fixture
        response_initial = client.post('/bakery/bakedcookies/', cookie_data)

        # Get the ID of location_name from cookie_data
        location_name_id = cookie_data["location_name"]
        
        # Now, try to update it
        response = client.patch(f'/bakery/bakedcookies/{response_initial.data["id"]}/', {'quantity': 8, 'location': location_name_id})

        assert response.status_code == status.HTTP_200_OK