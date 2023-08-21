import pytest
from rest_framework.test import APIClient
from rest_framework import status
from .base_test import cookie_data, authenticated_client as client

@pytest.mark.django_db
class TestCreateBakedCookie:
    def test_if_user_is_anonymous_returns_401(self, cookie_data):
        client = APIClient()
        response = client.post('/bakery/bakedcookies/', cookie_data)
        
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
    
    def test_if_required_fields_are_not_null_returns_400(self, client, cookie_data):
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

    def test_if_cookie_posted_successfully_returns_201(self, client, cookie_data):
        # Create a Cookie and Location object (or whatever your models are named)
        response = client.post('/bakery/bakedcookies/', cookie_data)
        
        assert response.status_code == status.HTTP_201_CREATED

@pytest.mark.django_db
class TestUpdateBakedCookie:
    def test_update_location_and_quantity_returns_200(self, client, cookie_data):
        # Create the BakedCookie instance with the data from cookie_data fixture
        response_initial = client.post('/bakery/bakedcookies/', cookie_data)

        # Get the ID of location_name from cookie_data
        location_name_id = cookie_data["location_name"]

        response = client.patch(f'/bakery/bakedcookies/{response_initial.data["id"]}/', {'quantity': 8, 'location': location_name_id})

        assert response.status_code == status.HTTP_200_OK
        
@pytest.mark.django_db
class TestDeleteBakedCookie:
    def test_delete_cookie_returns_404(self, client, cookie_data):
        
        response_initial = client.post('/bakery/bakedcookies/', cookie_data)
        
        response_delete = client.delete(f'/bakery/bakedcookies/{response_initial.data["id"]}/')
        
        assert response_delete.status_code == status.HTTP_204_NO_CONTENT
        
        response_get = client.get(f'/bakery/bakedcookies/{response_initial.data["id"]}/')
        assert response_get.status_code == status.HTTP_404_NOT_FOUND
