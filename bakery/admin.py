from django.contrib import admin
from django.db.models import Case, F, IntegerField, Q, Sum, When
from django.urls import reverse
from django.utils.html import format_html, urlencode
from .models import *

class CookieImageInline(admin.TabularInline):
    model = CookieImage
    readonly_fields = ['thumbnail']
    
    def thumbnail(self, instance):
        if instance.image.name != '':
            return format_html(f'<img src="{instance.image.url}" class="thumbnail" />')
        return ''

class BaseAdmin(admin.ModelAdmin):
    list_editable = ['quantity']
    

@admin.register(Cookie)
class CookieAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'dough_quantity', 'mega_quantity',  'mini_quantity', 'mega_in_store', 'mini_in_store']
    search_fields = ['name__icontains']
    inlines = [CookieImageInline]

    def _formatted_link(self, cookie, app_name, model_name, attribute_name, size=None):
        """
        Returns a formatted HTML link to the changelist view of specified objects with specified criteria.
        """
        filters = {'cookie__id': str(cookie.id)}
        if size:
            filters['size'] = size
        
        url = reverse(f'admin:{app_name}_{model_name}_changelist') + '?' + urlencode(filters)
        
        return format_html('<a href="{}">{}</a>', url, getattr(cookie, attribute_name))

    def dough_quantity(self, cookie):
        return self._formatted_link(cookie, app_name="bakery", model_name="dough", attribute_name="dough_quantity")

    def mega_quantity(self, cookie):
        return self._formatted_link(cookie, app_name="bakery", model_name="bakedcookie", attribute_name="baked_quantity", size="mega")

    def mini_quantity(self, cookie):
        return self._formatted_link(cookie, app_name="bakery", model_name="bakedcookie", attribute_name="mini_quantity", size="mini")

    def mega_in_store(self, cookie):
        return self._formatted_link(cookie, app_name="bakery", model_name="store", attribute_name="store_mega", size="mega")

    def mini_in_store(self, cookie):
        return self._formatted_link(cookie, app_name="bakery", model_name="store", attribute_name="store_mini", size="mini")

    def get_queryset(self, request):
        """
        Overrides the default queryset to optimize retrieval and annotate quantities of related objects.
        """
        queryset = super().get_queryset(request).prefetch_related(
        'bakedcookie_set', 'dough_set', 'store_set'
        )  

        return queryset.only('id').annotate(
            baked_quantity=self._calculate_sum('bakedcookie_set', 'mega'),
            mini_quantity=self._calculate_sum('bakedcookie_set', 'mini'),
            dough_quantity=Sum('dough_set__quantity'),
            store_mega=self._calculate_sum('store_set', 'mega'),
            store_mini=self._calculate_sum('store_set', 'mini'),
        )

    @staticmethod
    def _calculate_sum(relation, size):
        """
        Calculate the annotated sum based on the relationship and size.
        """
        return Sum(
            Case(
                When(Q(**{f'{relation}__size': size}) | Q(name='cookie_name'), then=F(f'{relation}__quantity')),
                default=0,
                output_field=IntegerField()
            )
        )

    class Media:
        css = {
            'all': ['/static/bakery/styles.css']
        }


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
