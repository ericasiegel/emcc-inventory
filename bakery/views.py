from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.views import APIView
from .models import *
from .serializers import *

# Create your views here.
class CookieViewSet(ModelViewSet):
    queryset = Cookie.objects.all()
    serializer_class = CookieSerializer
    
    def get_serializer_context(self):
        return {'request': self.request}
    
    def destroy(self, request, *args, **kwargs):
        if (Dough.objects.filter(cookie_id=kwargs['pk']).count() > 0) or (BakedCookie.objects.filter(cookie_id=kwargs['pk']).count() > 0) or (Store.objects.filter(cookie_id=kwargs['pk']).count() > 0):
            return Response({'error': 'Cookie cannot be deleted because it is associated with a dough, baked cookie, or store cookie.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

        return super().destroy(request, *args, **kwargs)


@api_view()
def dough_list(response):
    queryset = Dough.objects.all()