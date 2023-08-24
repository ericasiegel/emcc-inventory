
import pytest
from rest_framework import status
from .base_test import authenticated_client as client

from bakery.models import BakedCookie, Cookie, Dough, Location, Store

@pytest.fixture
def cookie_data():
    test_cookie = Cookie.objects.create(name='testingCookie')
    
    data = {
        "name": test_cookie.pk
    }
    return data

@pytest.fixture
def cookie_with_associations():
    test_location = Location.objects.create(title='testing location')
    test_cookie = Cookie.objects.create(name='testingCookie')
    test_dough = Dough.objects.create(cookie=test_cookie, quantity=1, location = test_location)
    test_baked = BakedCookie.objects.create(cookie=test_cookie, size = 'mega', quantity = 3, location = test_location)
    test_store = Store.objects.create(cookie=test_cookie, size="mini", quantity = 2)
    
    data = {
        "cookie": test_cookie,
        "dough": test_dough,
        "baked_cookie": test_baked,
        "store": test_store
    }

    return data

@pytest.mark.django_db
class TestCreateCookie:
    def test_if_required_fields_are_not_null_returns_400(self, client, cookie_data):
        cookie_data['name'] = ''
        response = client.post('/bakery/cookies/', cookie_data )
            
        assert response.status_code == status.HTTP_400_BAD_REQUEST
    
    def test_if_cookie_posted_successfully_returns_201(self, client, cookie_data):
        response = client.post('/bakery/cookies/', cookie_data)
        print(cookie_data)
        assert response.status_code == status.HTTP_201_CREATED
        
    def test_for_duplicate_cookie_returns_400(self, client, cookie_data):
        client.post('/bakery/cookies/', cookie_data)
        cookieTwo_response = client.post('/bakery/cookies/', cookie_data)
        
        assert cookieTwo_response.status_code == status.HTTP_400_BAD_REQUEST
        

@pytest.mark.django_db
class TestUpdateCookie:
    def test_update_cookie_name_returns_200(self, client, cookie_data):
        create_cookie_response = client.post('/bakery/cookies/', cookie_data)
        changed_cookie_response = client.patch(f'/bakery/cookies/{create_cookie_response.data["id"]}/', {"name": "updatedCookie"})
        
        assert changed_cookie_response.status_code == status.HTTP_200_OK
        
@pytest.mark.django_db
class TestDeleteCookie:
    def test_if_cookie_has_associations_returns_405(self, client, cookie_with_associations):
        cookie_id = cookie_with_associations["cookie"].id

        response = client.delete(f'/bakery/cookies/{cookie_id}/')

        assert response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED
    
    def test_deletion_of_cookie_returns_204_404(self, client, cookie_data):
        create_cookie = client.post('/bakery/cookies/', cookie_data)
        
        delete_cookie = client.delete(f'/bakery/cookies/{create_cookie.data["id"]}/')
        assert delete_cookie.status_code == status.HTTP_204_NO_CONTENT
        
        get_response = client.get(f'/bakery/cookies/{create_cookie.data["id"]}/')
        assert get_response.status_code == status.HTTP_404_NOT_FOUND
        