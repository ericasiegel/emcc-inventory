from django import forms
from django.contrib import admin
from django.db.models import Case, F, IntegerField, Q, Sum, Value, When
from django.db.models.query import QuerySet
from django.urls import reverse
from django.utils.html import format_html, urlencode

from .models import *


class BaseAdmin(admin.ModelAdmin):
    list_editable = ['quantity']
    

@admin.register(Cookie)
class CookieAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'dough_quantity', 'mega_quantity',  'mini_quantity', 'mega_in_store', 'mini_in_store']
    search_fields = ['name__icontains']
    
    def mega_quantity(self, cookie):
        """
        Returns a formatted HTML link to the changelist view of 'BakedCookie' objects with the specified 'cookie' and size 'mega'.
        """
        url = (
            reverse('admin:bakery_bakedcookie_changelist')
            + '?'
            + urlencode({
                'cookie__id':str(cookie.id),
                'size': 'mega'
            })
        )
        return format_html('<a href="{}">{}</a>', url, cookie.baked_quantity)
    
    def mini_quantity(self, cookie):
        """
        Returns a formatted HTML link to the changelist view of 'BakedCookie' objects with the specified 'cookie' and size 'mini'.
        """
        url = (
            reverse('admin:bakery_bakedcookie_changelist')
            + '?'
            + urlencode({
                'cookie__id':str(cookie.id),
                'size': 'mini'
            })
        )
        return format_html('<a href="{}">{}</a>', url, cookie.mini_quantity)
    
    def dough_quantity(self, cookie):
        """
        Returns a formatted HTML link to the changelist view of 'Dough' objects with the specified 'cookie'.
        """
        url = (
            reverse('admin:bakery_dough_changelist')
            + '?'
            + urlencode({
                'cookie__id':str(cookie.id)
            })
        )
        return format_html('<a href="{}">{}</a>', url, cookie.dough_quantity)
    
    def mega_in_store(self, cookie):
        """
        Returns a formatted HTML link to the changelist view of 'Store' objects with the specified 'cookie' and size 'mega'.
        """
        url = (
            reverse('admin:bakery_store_changelist')
            + '?'
            + urlencode({
                'cookie__id':str(cookie.id),
                'size': 'mega'
            })
        )
        return format_html('<a href="{}">{}</a>', url, cookie.store_mega)
    
    def mini_in_store(self, cookie):
        """
        Returns a formatted HTML link to the changelist view of 'Store' objects with the specified 'cookie' and size 'mini'.
        """
        url = (
            reverse('admin:bakery_store_changelist')
            + '?'
            + urlencode({
                'cookie__id':str(cookie.id),
                'size': 'mini'
            })
        )
        return format_html('<a href="{}">{}</a>', url, cookie.store_mini)

    def get_queryset(self, request):
        """
        Overrides the default queryset to optimize retrieval and annotate quantities of related objects.
        """
        queryset = super().get_queryset(request).prefetch_related(
        'bakedcookie_set', 'dough_set', 'store_set'
        )  

        return queryset.only('id').annotate(
            baked_quantity=Sum(
                Case(
                    When(Q(bakedcookie_set__size='mega') | Q(name='cookie_name'), then=F('bakedcookie_set__quantity')),
                    default=0,
                    output_field=IntegerField()
                )
            ),
            mini_quantity=Sum(
                Case(
                    When(Q(bakedcookie_set__size='mini') | Q(name='cookie_name'), then=F('bakedcookie_set__quantity')),
                    default=0,
                    output_field=IntegerField()
                )
            ),
            dough_quantity=Sum('dough_set__quantity'),
            store_mega=Sum(
                Case(
                    When(Q(store_set__size='mega') | Q(name='cookie_name'), then=F('store_set__quantity')),
                    default=0,
                    output_field=IntegerField()
                )
            ),
            store_mini=Sum(
                Case(
                    When(Q(store_set__size='mini') | Q(name='cookie_name'), then=F('store_set__quantity')),
                    default=0,
                    output_field=IntegerField()
                )
            ),
        )
    


@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ['id', 'cookie', 'description', 'ingredients', 'instructions', 'created_at', 'last_updated', 'modified_by']
    list_editable = ['description', 'ingredients', 'instructions']
    list_select_related = ['cookie', 'modified_by']
    list_per_page = 5
    search_fields = ['cookie__name__icontains']
    list_filter = ['last_updated', 'cookie']
    exclude = ['modified_by']
    autocomplete_fields = ['cookie']


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ['id', 'title']
    search_fields = ['title__icontains']
    

@admin.register(Dough)
class DoughAdmin(BaseAdmin):
    list_display = ['id', 'cookie', 'quantity', 'location', 'date_added']
    list_select_related = ['cookie', 'location']
    list_per_page = 10
    search_fields = ['cookie__name__icontains', 'location__title__icontains']
    list_filter = ['date_added', 'location']
    autocomplete_fields = ['cookie', 'location']


@admin.register(BakedCookie)
class BakedCookieAdmin(BaseAdmin):
    list_display = ['id', 'cookie', 'quantity', 'size', 'location', 'date_added']
    list_select_related = ['cookie', 'location']
    list_per_page = 10
    search_fields = ['cookie__name__icontains', 'location__title__icontains', 'size__icontains']
    list_filter = ['date_added', 'size', 'location']
    autocomplete_fields = ['cookie', 'location']

    
@admin.register(Grocery)
class GroceryAdmin(BaseAdmin):
    list_display = ['id', 'title', 'quantity', 'description', 'location', 'order_link']
    list_per_page = 10
    search_fields = ['title__icontains', 'location__title__icontains']
    list_filter = ['location']
    autocomplete_fields = ['location']

@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    list_display = ['id', 'cookie', 'size', 'quantity', 'last_updated', 'updated_by']
    list_editable = ['quantity']
    list_select_related = ['cookie', 'updated_by']
    search_fields = ['cookie__name__icontains', 'size__icontains']
    list_filter = ['last_updated', 'size']
    exclude = ['updated_by']
    autocomplete_fields = ['cookie']
