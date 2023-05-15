from django.urls import path
from rest_framework.routers import SimpleRouter
from rest_framework_nested import routers

from .models import *
from .views import *

router = routers.DefaultRouter()
router.register('cookies', CookieViewSet)
router.register('doughs', DoughViewSet)
router.register('bakedcookies', BakedCookieViewSet)
router.register('store', StoreViewSet)
router.register('locations', LocationViewSet)
router.register('recipes', RecipeViewSet)
router.register('groceries', GroceryViewSet)

# cookies_router = routers.NestedDefaultRouter(router, 'cookies', lookup ='cookie')
# cookies_router.register('recipe', RecipeViewSet, basename='cookie_recipe')


urlpatterns = router.urls
