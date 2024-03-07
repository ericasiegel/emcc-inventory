import django_filters
from .models import Cookie, Store, BakedCookie

class CookieFilter(django_filters.FilterSet):
    # is_active = django_filters.BooleanFilter(field_name='is_active')
    
    class Meta:
        model = Cookie
        fields = ['is_active']
        
class StoreFilter(django_filters.FilterSet):
    size = django_filters.CharFilter(field_name='size')
    cookie_id = django_filters.NumberFilter(field_name='cookie_id')

    class Meta:
        model = Store
        fields = ['size', 'cookie_id']

class BakedCookieFilter(django_filters.FilterSet):
    size = django_filters.CharFilter(field_name='size')
    cookie_id = django_filters.NumberFilter(field_name='cookie_id')

    class Meta:
        model = BakedCookie
        fields = ['size', 'cookie_id']