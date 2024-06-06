from django.contrib import admin
from django.db.models import Case, F, IntegerField, Q, Sum, When
from django.urls import reverse
from django.utils.html import format_html, urlencode
from .models import *

# Define an inline admin class for CookieImage
# class CookieImageInline(admin.TabularInline):
#     model = CookieImage
#     readonly_fields = ['thumbnail']
#     extra = 1

#     # Define a custom thumbnail method for rendering images
#     def thumbnail(self, instance):
#         if instance.image.name != '':
#             return format_html(f'<img src="{instance.image.url}" class="thumbnail" />')
#         return ''

# BaseAdmin class with list_editable attribute
class BaseAdmin(admin.ModelAdmin):
    list_editable = ['quantity']

# Register the Cookie model with custom admin settings
@admin.register(Cookie)
class CookieAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'description', 'is_active', 'image', 'dough_quantity', 'mega_quantity', 'mini_quantity', 'mega_in_store', 'mini_in_store']
    search_fields = ['name__icontains']
    exclude = ['slug']
    
     # Add a custom method to display the thumbnail
    # def display_thumbnail(self, obj):
    #     return format_html(f'<img src="{obj.image.url}" width="50" height="50" />')
    
    # display_thumbnail.short_description = 'Thumbnail'

    # Custom method to create formatted HTML links to related objects' changelist views
    def _formatted_link(self, cookie, app_name, model_name, attribute_name, size=None):
        """
        Returns a formatted HTML link to the changelist view of specified objects with specified criteria.
        """
        filters = {'cookie__id': str(cookie.id)}
        if size:
            filters['size'] = size
        
        url = reverse(f'admin:{app_name}_{model_name}_changelist') + '?' + urlencode(filters)
        
        return format_html('<a href="{}">{}</a>', url, getattr(cookie, attribute_name))

    # Custom methods for displaying links to related objects' changelist views
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

    # Custom queryset method to optimize retrieval and annotate quantities of related objects
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

    # Define media settings to include custom CSS
    class Media:
        css = {
            'all': ['/static/bakery/styles.css']
        }

# Register the Location model with custom admin settings
@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ['id', 'title']
    search_fields = ['title__icontains']

# Register the Dough model with custom admin settings
@admin.register(Dough)
class DoughAdmin(BaseAdmin):
    list_display = ['id', 'cookie', 'quantity', 'location', 'date_added']
    list_select_related = ['cookie', 'location']
    list_per_page = 10
    search_fields = ['cookie__name__icontains', 'location__title__icontains']
    list_filter = ['date_added', 'location']
    autocomplete_fields = ['cookie', 'location']

# Register the BakedCookie model with custom admin settings
@admin.register(BakedCookie)
class BakedCookieAdmin(BaseAdmin):
    list_display = ['id', 'cookie', 'quantity', 'size', 'location', 'date_added']
    list_select_related = ['cookie', 'location']
    list_per_page = 10
    search_fields = ['cookie__name__icontains', 'location__title__icontains', 'size__icontains']
    list_filter = ['date_added', 'size', 'location']
    autocomplete_fields = ['cookie', 'location']

# Register the Store model with custom admin settings
@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    list_display = ['id', 'cookie', 'size', 'quantity', 'last_updated', 'updated_by']
    list_editable = ['quantity']
    list_select_related = ['cookie', 'updated_by']
    search_fields = ['cookie__name__icontains', 'size__icontains']
    list_filter = ['last_updated', 'size']
    exclude = ['updated_by']
    autocomplete_fields = ['cookie']

# Register the Ingredient model with custom admin settings
@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['name']

# Register the RecipeInstruction model with custom admin settings
@admin.register(RecipeInstruction)
class RecipeInstructionAdmin(admin.ModelAdmin):
    list_display = ['id', 'instruction']
    list_editable = ['instruction']

# Register the RecipeIngredient model with custom admin settings
@admin.register(RecipeIngredient)
class RecipeIngredientAdmin(admin.ModelAdmin):
    list_display = ['id', 'ingredient', 'quantity', 'unit']
    list_editable = ['quantity', 'unit']
    search_fields = ['ingredient__name', 'cookie__name']
    list_filter = ['cookie']
    autocomplete_fields = ['ingredient', 'cookie']

# Inline admin class for RecipeIngredient
class RecipeIngredientInline(admin.TabularInline):
    model = RecipeIngredient
    extra = 1

# Register the Grocery model with custom admin settings
@admin.register(Grocery)
class GroceryAdmin(BaseAdmin):
    list_display = ['id', 'ingredient', 'quantity', 'unit', 'description', 'location', 'order_link']
    list_per_page = 10
    list_editable = ['quantity', 'unit', 'description', 'location', 'order_link']
    search_fields = ['ingredient', 'title__icontains', 'location__title__icontains']
    list_filter = ['location']
    autocomplete_fields = ['location']
