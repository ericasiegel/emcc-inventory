from django.urls import path
from rest_framework.routers import SimpleRouter
from .views import *
from .models import  *

router = SimpleRouter()
router.register('cookies', CookieViewSet)
router.register('doughs', DoughViewSet)
router.register('bakedcookies', BakedCookieViewSet)


urlpatterns = router.urls
