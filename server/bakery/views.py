from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, viewsets, mixins
from rest_framework.decorators import action
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import *
from .permissions import IsAdminOrReadOnly
from .serializers import *
from .filters import CookieFilter
from rest_framework.generics import get_object_or_404


# Create your views here.
class CookieViewSet(ModelViewSet):
    queryset = Cookie.objects.prefetch_related('dough_set', 'bakedcookie_set', 'store_set', 'images').all()
    serializer_class = CookieSerializer
    filter_backends = [SearchFilter, OrderingFilter, DjangoFilterBackend]
    search_fields = ['name']
    ordering_fields = ['id', 'is_active']
    filterset_class = CookieFilter
    lookup_field = 'slug'
    
    def get_serializer_context(self):
        return {'request': self.request}
    
    def get_object(self):
        lookup_value = self.kwargs.get(self.lookup_field)
        queryset = self.filter_queryset(self.get_queryset())

        # Check if the lookup value is a digit (ID) or a string (slug)
        if not lookup_value.isdigit():
            return get_object_or_404(queryset, slug=lookup_value)
        
        return get_object_or_404(queryset, pk=lookup_value)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        
        if (
            Dough.objects.filter(cookie_id=instance.pk).exists() or
            BakedCookie.objects.filter(cookie_id=instance.pk).exists() or
            Store.objects.filter(cookie_id=instance.pk).exists()
            ):
            return Response(
                {'error': 'Cookie cannot be deleted because it is associated with a dough, baked cookie, or store cookie.'}, 
                status=status.HTTP_405_METHOD_NOT_ALLOWED
                )

        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class CookieImageViewSet(ModelViewSet):
    serializer_class = CookieImageSerializer

    def get_serializer_context(self):
        # Check if the lookup value is a digit (ID) or a string (slug)
        lookup_value = self.kwargs.get('cookie_slug')
        if lookup_value.isdigit():
            return {'cookie_id': int(lookup_value)}  # Pass the ID
        else:
            return {'cookie_slug': lookup_value}  # Pass the slug
    
    def get_queryset(self):
        # Check if the lookup value is a digit (ID) or a string (slug)
        lookup_value = self.kwargs.get('cookie_slug')
        if lookup_value.isdigit():
            return CookieImage.objects.filter(cookie_id=int(lookup_value))  # Filter by ID
        else:
            return CookieImage.objects.filter(cookie__slug=lookup_value)  # Filter by slug

    # def get_serializer_context(self):
    #     print('first', self.kwargs)
    #     return {'cookie_id': self.kwargs['cookie_pk']}
    
    # def get_queryset(self):
    #     print('second', self.kwargs)
    #     return CookieImage.objects.filter(cookie__id=self.kwargs['cookie_pk'])

class DoughViewSet(ModelViewSet):
    queryset = Dough.objects.select_related('cookie', 'location').all()
    serializer_class = DoughSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['cookie_id', 'location']
    search_fields = ['cookie__name']
    ordering_fields = ['id', 'cookie__name', 'date_added', 'location']
    
    def partial_update(self, request, *args, **kwargs):
        # Check if any fields other than 'quantity' and 'location_name' are present in the request data
        for key in request.data.keys():
            if key not in ['quantity', 'location']:
                return Response({"detail": f"Field '{key}' is not allowed to be updated."},
                                status=status.HTTP_400_BAD_REQUEST)

        # If only 'quantity' and 'location_name' are present, proceed with the update
        return super(DoughViewSet, self).partial_update(request, *args, **kwargs)
    
class BakedCookieViewSet(mixins.RetrieveModelMixin,
                                        mixins.ListModelMixin,
                                        mixins.CreateModelMixin,
                                        mixins.DestroyModelMixin,
                                        mixins.UpdateModelMixin, # This is needed for the partial_update method
                                        viewsets.GenericViewSet):
    queryset = BakedCookie.objects.select_related('cookie', 'location').all()
    serializer_class = BakedCookieSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['cookie_id', 'size', 'location']
    search_fields = ['cookie__name', 'size']
    ordering_fields = ['id', 'cookie__name', 'date_added', 'size', 'location']
    
    def partial_update(self, request, *args, **kwargs):
        # Check if any fields other than 'quantity' and 'location_name' are present in the request data
        for key in request.data.keys():
            if key not in ['quantity', 'location']:
                return Response({"detail": f"Field '{key}' is not allowed to be updated."},
                                status=status.HTTP_400_BAD_REQUEST)

        # If only 'quantity' and 'location_name' are present, proceed with the update
        return super(BakedCookieViewSet, self).partial_update(request, *args, **kwargs)
    
class StoreViewSet(ModelViewSet):
    queryset = Store.objects.select_related('cookie', 'updated_by').all()
    serializer_class = StoreSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['cookie_id', 'size']
    search_fields = ['cookie__name', 'size']
    ordering_fields = ['id', 'cookie__name', 'last_updated', 'size', 'location']
    
    def partial_update(self, request, *args, **kwargs):
        # Check if any fields other than 'quantity' and 'location_name' are present in the request data
        for key in request.data.keys():
            if key not in ['quantity']:
                return Response({"detail": f"Field '{key}' is not allowed to be updated."},
                                status=status.HTTP_400_BAD_REQUEST)

        # If only 'quantity' and 'location_name' are present, proceed with the update
        return super(StoreViewSet, self).partial_update(request, *args, **kwargs)
    
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

