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
router.register('ingredients', IngredientViewSet, basename='ingredients')
router.register('recipe-ingredients', RecipeIngredientViewSet, basename='recipe_ingredients')

cookies_router = routers.NestedDefaultRouter(router, 'cookies', lookup ='cookie')
cookies_router.register('images', CookieImageViewSet, basename='cookie-images')


urlpatterns = router.urls + cookies_router.urls
