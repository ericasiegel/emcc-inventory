from django.contrib import admin
from .models import *


class BaseAdmin(admin.ModelAdmin):
    list_editable = ['quantity']
    
    
    def get_storage(shelf, obj):
        """
        function to get the name of the storage associated
        with the shelf type and the dough.

        """
        return obj.shelf.storage.title
    
    # displays the field title as 'storage' in Admin interface
    get_storage.short_description = 'Storage'
    

@admin.register(Cookie)
class CookieAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['name__icontains']


@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ['id', 'cookie', 'description', 'ingredients', 'instructions', 'created_at', 'last_updated', 'modified_by']
    list_editable = ['description', 'ingredients', 'instructions']
    list_select_related = ['cookie', 'modified_by']
    list_per_page = 5


@admin.register(Storage)
class StorageAdmin(admin.ModelAdmin):
    list_display = ['id', 'title']
    
    
@admin.register(Shelf)
class ShelfAdmin(admin.ModelAdmin):
    list_display = ['id', 'type', 'storage']
    

@admin.register(Dough)
class DoughAdmin(BaseAdmin):
    list_display = ['id', 'cookie', 'quantity', 'shelf', 'get_storage', 'date_added']
    list_select_related = ['cookie', 'shelf', 'shelf__storage']
    list_per_page = 10

@admin.register(BakedCookie)
class BakedCookieAdmin(BaseAdmin):
    list_display = ['id', 'cookie', 'quantity', 'size', 'shelf', 'get_storage', 'date_added']
    list_select_related = ['cookie', 'shelf', 'shelf__storage']
    list_per_page = 10
    
@admin.register(Grocery)
class GroceryAdmin(BaseAdmin):
    list_display = ['id', 'title', 'quantity', 'description', 'shelf', 'get_storage', 'order_link']
    list_per_page = 10

@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    list_display = ['id', 'cookie', 'size', 'quantity', 'last_updated', 'updated_by']
    list_editable = ['quantity']
    list_select_related = ['cookie', 'updated_by']
