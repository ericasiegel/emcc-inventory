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
router.register('groceries', GroceryViewSet)
router.register('ingredient', IngredientViewSet)
router.register('ingredients', RecipeIngredientViewSet, basename='ingredients')
router.register('instructions', RecipeInstructionViewSet)


urlpatterns = router.urls
