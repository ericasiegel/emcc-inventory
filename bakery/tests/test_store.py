import pytest
from rest_framework import status

from bakery.models import Cookie

from .base_test import authenticated_client as client


@pytest.fixture
def cookie_data():
    test_cookie = Cookie.objects.create(name='testingCookie')
    data = {
        "cookie_name": test_cookie.pk,
        "quantity": 6,
        "size": "mini"
    }
    return data

@pytest.mark.django_db
class TestCreateStoreCookie:
    def test_if_required_fields_are_not_null_returns_400(self, client, cookie_data):
        for key in cookie_data.keys():
            modified_data = {k:v for k, v in cookie_data.items() if k != key}
            response = client.post('/bakery/store/', modified_data)
            
            assert response.status_code == status.HTTP_400_BAD_REQUEST
            assert key in response.data
            assert response.data[key] is not None
            
    def test_if_cookie_posted_successfully_returns_201(self, client, cookie_data):
        response = client.post('/bakery/store/', cookie_data)
        
        assert response.status_code == status.HTTP_201_CREATED
    
    def test_if_cookie_size_is_not_unique_returns_400(self, client, cookie_data):
        client.post('/bakery/store/', cookie_data) #first creation attempt
        cookieTwo_response = client.post('/bakery/store/', cookie_data) # second attempt with same data
        
        assert cookieTwo_response.status_code == status.HTTP_400_BAD_REQUEST
        
@pytest.mark.django_db
class TestUpdateStoreCookie:
    def test_update_quantity_returns_200(self, client, cookie_data):
        create_cookie_response = client.post('/bakery/store/', cookie_data)
        response = client.patch(f'/bakery/store/{create_cookie_response.data["id"]}/', {'quantity': 3})
        assert response.status_code == status.HTTP_200_OK
        

@pytest.mark.django_db
class TestDeleteStoreCookie:
    def test_delete_cookie_returns_204_404(self, client, cookie_data):
        create_cookie_response = client.post('/bakery/store/', cookie_data)
        
        delete_cookie_response = client.delete(f'/bakery/store/{create_cookie_response.data["id"]}/')
        assert delete_cookie_response.status_code == status.HTTP_204_NO_CONTENT
        
        get_response = client.get(f'/bakery/store/{create_cookie_response.data["id"]}/')
        assert get_response.status_code == status.HTTP_404_NOT_FOUND