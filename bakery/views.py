from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action

from .models import *
from .serializers import *
from .permissions import IsAdminOrReadOnly


# Create your views here.
class CookieViewSet(ModelViewSet):
    queryset = Cookie.objects.prefetch_related('dough_set', 'bakedcookie_set', 'store_set').all()
    serializer_class = CookieSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['id']
    
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
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['cookie_id', 'location']
    search_fields = ['cookie__name']
    ordering_fields = ['id', 'cookie__name', 'date_added', 'location']
    
class BakedCookieViewSet(ModelViewSet):
    queryset = BakedCookie.objects.select_related('cookie', 'location').all()
    serializer_class = BakedCookieSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['cookie_id', 'size', 'location']
    search_fields = ['cookie__name', 'size']
    ordering_fields = ['id', 'cookie__name', 'date_added', 'size', 'location']
    
class StoreViewSet(ModelViewSet):
    queryset = Store.objects.select_related('cookie', 'updated_by').all()
    serializer_class = StoreSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['cookie_id', 'size']
    search_fields = ['cookie__name', 'size']
    ordering_fields = ['id', 'cookie__name', 'last_updated', 'size', 'location']
    
class LocationViewSet(ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['title']
    ordering_fields = ['id', 'title']
      
class RecipeViewSet(ModelViewSet):
    queryset = Recipe.objects.select_related('cookie', 'modified_by').all()
    serializer_class = RecipeSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['cookie_id']
    search_fields = ['cookie__name']
    ordering_fields = ['id', 'cookie__name', 'created_at', 'last_updated']
    permission_classes = [IsAdminOrReadOnly]
    
class GroceryViewSet(ModelViewSet):
    queryset = Grocery.objects.select_related('location').all()
    serializer_class = GrocerySerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['location']
    search_fields = ['title', 'location']
    ordering_fields = ['id', 'title', 'location']
    
class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
    
    @action(detail=False, methods=['GET', 'PUT'], permission_classes=[IsAuthenticated])
    def me(self, request):
        (user, created) = User.objects.get_or_create(user_id=request.user.id)
        if request.method == 'GET':
            serializer = UserSerializer(user)
            return Response(serializer.data)
        elif request.method =='PUT':
            serializer = UserSerializer(user, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
    