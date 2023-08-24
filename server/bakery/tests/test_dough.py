import pytest
from rest_framework import status
from .base_test import authenticated_client as client

from bakery.models import Cookie, Location

@pytest.fixture
def cookie_data():
    test_cookie = Cookie.objects.create(name='testingCookie')
    test_location = Location.objects.create(title='testing location')

    data = {
        "cookie_name": test_cookie.pk,
        "quantity": 1,
        "location_name": test_location.pk
    }
    return data

@pytest.mark.django_db
class TestCreateDough:
    def test_if_required_fields_are_not_null_returns_400(self, client, cookie_data):
        for key in cookie_data.keys():
            modified_data = {k:v for k, v in cookie_data.items() if k != key}
            response = client.post('/bakery/doughs/', modified_data)
            
            assert response.status_code == status.HTTP_400_BAD_REQUEST
            assert key in response.data
            assert response.data[key] is not None
            
    def test_if_cookie_posted_successfully_returns_201(self, client, cookie_data):
        response = client.post('/bakery/doughs/', cookie_data)
        
        assert response.status_code == status.HTTP_201_CREATED
            

@pytest.mark.django_db
class TestUpdateDough:
    def test_update_location_and_quantity_returns_200(self, client, cookie_data):
        create_cookie_response = client.post('/bakery/doughs/', cookie_data)
        response = client.patch(f'/bakery/doughs/{create_cookie_response.data["id"]}/', {'quantity': 3, 'location': 2})
        assert response.status_code == status.HTTP_200_OK
        

@pytest.mark.django_db
class TestDeleteDough:
    def test_delete_dough_returns_204_404(self, client, cookie_data):
        create_cookie_response = client.post('/bakery/doughs/', cookie_data)
        
        delete_cookie_response = client.delete(f'/bakery/doughs/{create_cookie_response.data["id"]}/')
        assert delete_cookie_response.status_code == status.HTTP_204_NO_CONTENT
        
        get_response = client.get(f'/bakery/doughs/{create_cookie_response.data["id"]}/')
        assert get_response.status_code == status.HTTP_404_NOT_FOUND