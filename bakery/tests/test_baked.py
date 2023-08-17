from rest_framework.test import APIClient
from rest_framework import status

class TestCreateBakedCookie:
    def test_if_user_is_anonymous_returns_401():
        client = APIClient()
        response = client.post('/bakery/bakedcookies/', {
    "cookie_name": null,
    "size": null,
    "quantity": null,
    "location_name": null
})