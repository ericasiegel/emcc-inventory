from django.db.models import Prefetch
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from .models import *
from .serializers import *


# Create your views here.
class CookieViewSet(ModelViewSet):
    # queryset = Cookie.objects.all().prefetch_related('dough_set', 'bakedcookie_set', 'store_set')
    queryset = Cookie.objects.prefetch_related('dough_set', 'bakedcookie_set', 'store_set').all()
    serializer_class = CookieSerializer
    
    def get_serializer_context(self):
        return {'request': self.request}

    def destroy(self, request, *args, **kwargs):
        if (
            Dough.objects.filter(cookie_id=kwargs['pk']).exists() or
            BakedCookie.objects.filter(cookie_id=kwargs['pk']).exists() or
            Store.objects.filter(cookie_id=kwargs['pk']).exists()
            ):
            return Response(
                {'error': 'Cookie cannot be deleted because it is associated with a dough, baked cookie, or store cookie.'}, 
                status=status.HTTP_405_METHOD_NOT_ALLOWED
                )

        return super().destroy(request, *args, **kwargs)

class DoughViewSet(ModelViewSet):
    queryset = Dough.objects.select_related('cookie', 'location').all()
    serializer_class = DoughSerializer
    
class BakedCookieViewSet(ModelViewSet):
    queryset = BakedCookie.objects.select_related('cookie', 'location').all()
    serializer_class = BakedCookieSerializer
    
class StoreViewSet(ModelViewSet):
    queryset = Store.objects.select_related('cookie', 'updated_by').all()
    serializer_class = StoreSerializer
    
class LocationViewSet(ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
      
class RecipeViewSet(ModelViewSet):
    queryset = Recipe.objects.select_related('cookie', 'modified_by').all()
    serializer_class = RecipeSerializer
    
class GroceryViewSet(ModelViewSet):
    queryset = Grocery.objects.select_related('location').all()
    serializer_class = GrocerySerializer
    
    