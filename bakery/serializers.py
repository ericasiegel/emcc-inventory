from rest_framework import serializers
from django.db.models import Prefetch, Sum, Count, Q
from .models import *

class CookieSerializer(serializers.ModelSerializer):
    
    
    class Meta:
        model = Cookie
        fields = ['id', 'name']
        
    # class Meta:
    #     model = Cookie
    #     fields = ['id', 'name', 'counts']
    
    # counts = serializers.SerializerMethodField(method_name='calculate_totals')

    # def calculate_totals(self, cookie: Cookie):
    #     """
    #     Calculate the totals for dough, baked cookies, and cookies in store for a given cookie.

    #     Args:
    #         cookie (Cookie): The cookie object to calculate totals for.

    #     Returns:
    #         dict: A dictionary containing the totals for dough, baked cookies, and cookies in store.

    #     """
    #     # Query the database for baked cookies, dough, and store cookies related to the given cookie
    #     baked_queryset = BakedCookie.objects.filter(cookie=cookie)
    #     dough_queryset = Dough.objects.filter(cookie=cookie)
    #     storecookie_queryset = Store.objects.filter(cookie=cookie)

    #     # Initialize counters for dough and different cookie sizes
    #     dough_total = 0
    #     baked_mini_quantity = 0
    #     baked_mega_quantity = 0
    #     store_mini_quantity = 0
    #     store_mega_quantity = 0

    #     # Calculate the total quantity of dough for the given cookie
    #     for doughs in dough_queryset:
    #         dough_total += doughs.quantity

    #     # Count the quantity of baked cookies for each size (mega and mini)
    #     for baked in baked_queryset:
    #         if baked.size == 'mega':
    #             baked_mega_quantity += baked.quantity
    #         elif baked.size == 'mini':
    #             baked_mini_quantity += baked.quantity

    #     # Count the quantity of cookies in store for each size (mega and mini)
    #     for store in storecookie_queryset:
    #         if store.size == 'mega':
    #             store_mega_quantity += store.quantity
    #         elif store.size == 'mini':
    #             store_mini_quantity += store.quantity

    #     # Return a dictionary containing the calculated totals for dough, baked cookies, and cookies in store
    #     return {
    #         'doughs': dough_total,
    #         'baked_cookies': {'mega': baked_mega_quantity, 'mini': baked_mini_quantity},
    #         'total_in_store': {'mega': store_mega_quantity, 'mini': store_mini_quantity}
    #     }

class CookieNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cookie
        fields = ['name']

class DoughSerializer(serializers.ModelSerializer):
    cookie = CookieNameSerializer(read_only=True)
    cookie_id = serializers.PrimaryKeyRelatedField(queryset=Cookie.objects.all(), write_only=True, source='cookie')
    class Meta:
        model = Dough
        fields = ['id', 'cookie', 'cookie_id', 'quantity', 'location', 'date_added']