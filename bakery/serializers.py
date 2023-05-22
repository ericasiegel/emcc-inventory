from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from djoser.serializers import UserSerializer as BaseUserSerializer
from rest_framework import serializers

from .models import *


# Method Classes
class DisplayChoiceField(serializers.ChoiceField):
    """
    A custom choice field for serializers that displays the choice label instead of the value.

    This field extends the base `ChoiceField` provided by the `serializers` module.
    It overrides the `to_representation` method to display the choice label instead of the value.

    Args:
        choices (iterable): A dictionary-like object containing the choices.
        **kwargs: Additional keyword arguments to pass to the base `ChoiceField` constructor.
    """

    def __init__(self, choices, **kwargs):
        super().__init__(choices, **kwargs)
        self.choice_strings_to_values = {
            key: key for key, value in self.choices.items()
        }

    def to_representation(self, value):
        """
        Converts the given value to its representation.

        This method overrides the base `ChoiceField` implementation.
        It returns the choice label instead of the value, if available.

        Args:
            value: The value to be converted.

        Returns:
            The representation of the value (choice label or original value).
        """
        return self.choices.get(value, value)

class UserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']
        
        
# Serializer Classes to display on API
class CookieImageSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        cookie_id = self.context['cookie_id']
        return CookieImage.objects.create(cookie_id=cookie_id, **validated_data)
    
    class Meta:
        model = CookieImage
        fields = ['id', 'image']
        

class CookieSerializer(serializers.ModelSerializer):
    counts = serializers.SerializerMethodField(method_name='calculate_totals')
    images = CookieImageSerializer(many=True, read_only=True)
    class Meta:
        model = Cookie
        fields = ['id', 'name', 'counts', 'images']
    
    def calculate_totals(self, cookie: Cookie):
        """
        Calculates the totals of doughs, baked cookies, and cookies in store for the given cookie.

        Args:
            cookie (Cookie): The cookie instance for which the totals are calculated.

        Returns:
            dict: A dictionary containing the totals of doughs, baked cookies, and cookies in store.
                The dictionary structure is as follows:
                {
                    'doughs': int,
                    'baked_cookies': {
                        'mega': int,
                        'mini': int
                    },
                    'total_in_store': {
                        'mega': int,
                        'mini': int
                    }
                }
        """

        # Retrieve all related baked cookies, doughs, and cookies in store for the given cookie
        baked_queryset = cookie.bakedcookie_set.all()
        dough_queryset = cookie.dough_set.all()
        store_queryset = cookie.store_set.all()

        # Calculate the total quantity of doughs
        dough_total = sum(dough.quantity for dough in dough_queryset)

        # Count the quantity of baked cookies by size
        baked_cookies = {'mega': 0, 'mini': 0}
        for baked in baked_queryset:
            if baked.size == 'mega':
                baked_cookies['mega'] += baked.quantity
            elif baked.size == 'mini':
                baked_cookies['mini'] += baked.quantity

        # Count the quantity of cookies in store by size
        store_cookies = {'mega': 0, 'mini': 0}
        for store in store_queryset:
            if store.size == 'mega':
                store_cookies['mega'] += store.quantity
            elif store.size == 'mini':
                store_cookies['mini'] += store.quantity

        # Return a dictionary with the calculated totals
        return {
            'doughs': dough_total,
            'baked_cookies': baked_cookies,
            'total_in_store': store_cookies
        }

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'title']

class DoughSerializer(serializers.ModelSerializer):
    cookie = serializers.StringRelatedField(read_only=True)
    cookie_name = serializers.PrimaryKeyRelatedField(queryset=Cookie.objects.all(), write_only=True, source='cookie')
    location = serializers.StringRelatedField(read_only=True)
    location_name = serializers.PrimaryKeyRelatedField(queryset=Location.objects.all(), write_only=True, source='location')

    class Meta:
        model = Dough
        fields = [
            'id',
            'cookie', 
            'cookie_name', 
            'quantity', 
            'location',
            'location_name',
            'date_added'
            ]

class BakedCookieSerializer(serializers.ModelSerializer):
    cookie = serializers.StringRelatedField(read_only=True)
    cookie_name = serializers.PrimaryKeyRelatedField(queryset=Cookie.objects.all(), write_only=True, source='cookie')
    size = DisplayChoiceField(choices=SIZE_CHOICES)
    location = serializers.StringRelatedField(read_only=True)
    location_name = serializers.PrimaryKeyRelatedField(queryset=Location.objects.all(), write_only=True, source='location')
    
    class Meta:
        model = Dough
        fields = [
            'id', 
            'cookie', 
            'cookie_name', 
            'size', 
            'quantity', 
            'location', 
            'location_name',
            'date_added'
            ]

class StoreSerializer(serializers.ModelSerializer):
    cookie = serializers.StringRelatedField(read_only=True)
    cookie_name = serializers.PrimaryKeyRelatedField(queryset=Cookie.objects.all(), write_only=True, source='cookie')
    size = DisplayChoiceField(choices=SIZE_CHOICES)
    updated_by = UserNameSerializer(read_only=True)
    
    class Meta:
        model = Store
        fields = [
            'id', 
            'cookie', 
            'cookie_name', 
            'size', 
            'quantity', 
            'last_updated', 
            'updated_by'
            ]
        
class RecipeSerializer(serializers.ModelSerializer):
    cookie = serializers.StringRelatedField(read_only=True)
    cookie_name = serializers.PrimaryKeyRelatedField(queryset=Cookie.objects.all(), write_only=True, source='cookie')
    modified_by = UserNameSerializer(read_only=True)
    
    class Meta:
        model = Recipe
        fields = [
            'id', 
            'cookie', 
            'cookie_name', 
            'description', 
            'ingredients', 
            'instructions', 
            'created_at',
            'last_updated',
            'modified_by'
            ]
           
class GrocerySerializer(serializers.ModelSerializer):
    location = serializers.StringRelatedField(read_only=True)
    location_name = serializers.PrimaryKeyRelatedField(queryset=Location.objects.all(), write_only=True, source='location')

    class Meta:
        model = Grocery
        fields = [
            'id',
            'title',
            'quantity',
            'description',
            'location',
            'location_name',
            'order_link'
        ]
        
#   Djoser Auth Serializers
class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        fields = [
            'id',
            'username',
            'password',
            'email',
            'first_name',
            'last_name'
        ]
        
class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name'
        ]        
    