from django.contrib import admin
from django.db.models import Case, F, IntegerField, Q, Sum, When
from django.urls import reverse
from django.utils.html import format_html, urlencode
from .models import *

class CookieImageInline(admin.TabularInline):
    model = CookieImage
    readonly_fields = ['thumbnail']
    extra = 1
    
    def thumbnail(self, instance):
        if instance.image.name != '':
            return format_html(f'<img src="{instance.image.url}" class="thumbnail" />')
        return ''

class BaseAdmin(admin.ModelAdmin):
    list_editable = ['quantity']
    

@admin.register(Cookie)
class CookieAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'is_active', 'dough_quantity', 'mega_quantity',  'mini_quantity', 'mega_in_store', 'mini_in_store']
    search_fields = ['name__icontains']
    exclude = ['slug']
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
    

@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    list_display = ['id', 'cookie', 'size', 'quantity', 'last_updated', 'updated_by']
    list_editable = ['quantity']
    list_select_related = ['cookie', 'updated_by']
    search_fields = ['cookie__name__icontains', 'size__icontains']
    list_filter = ['last_updated', 'size']
    exclude = ['updated_by']
    autocomplete_fields = ['cookie']
    
@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['name']
    
@admin.register(RecipeInstruction)
class RecipeInstructionAdmin(admin.ModelAdmin):
    list_display = ['id', 'instruction']
    list_editable = ['instruction']
    
@admin.register(RecipeIngredient)
class RecipeIngredientAdmin(admin.ModelAdmin):
    list_display = ['id', 'ingredient', 'recipe', 'quantity', 'unit']
    list_editable = ['quantity', 'unit']
    list_select_related = ['ingredient', 'recipe']
    search_fields = ['ingredient', 'recipe']
    list_filter = ['recipe']
    autocomplete_fields = ['ingredient', 'recipe']
    
class RecipeIngredientInline(admin.TabularInline):
    model = RecipeIngredient
    extra = 1


@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ['id', 'cookie', 'description', 'get_ingredients', 'get_instructions', 'created_at', 'last_updated', 'modified_by']
    filter_horizontal = ['instructions']
    list_editable = ['description']
    list_select_related = ['cookie', 'modified_by']
    list_per_page = 5
    search_fields = ['cookie__name__icontains']
    list_filter = ['last_updated', 'cookie']
    exclude = ['modified_by']
    autocomplete_fields = ['cookie']
    inlines = [RecipeIngredientInline]
    
    def get_ingredients(self, obj):
        ingredients_with_quantities = [
            f"{ri.ingredient.name} - {ri.quantity} {ri.unit if ri.unit else ''}"
            for ri in obj.recipeingredient_set.all()
        ]
        return ", ".join(ingredients_with_quantities)
    get_ingredients.short_description = 'Ingredients'
    
    def get_instructions(self, obj):
        return "\n".join([instruction.instruction for instruction in obj.instructions.all()])
    get_instructions.short_description = 'Instructions'


@admin.register(Grocery)
class GroceryAdmin(BaseAdmin):
    list_display = ['id', 'ingredient', 'quantity', 'unit', 'description', 'location', 'order_link']
    list_per_page = 10
    list_editable = ['quantity', 'unit', 'description', 'location', 'order_link']
    search_fields = ['ingredient', 'title__icontains', 'location__title__icontains']
    list_filter = ['location']
    autocomplete_fields = ['location']