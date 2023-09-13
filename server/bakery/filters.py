import django_filters
from .models import Cookie

class CookieFilter(django_filters.FilterSet):
    # is_active = django_filters.BooleanFilter(field_name='is_active')
    
    class Meta:
        model = Cookie
        fields = ['is_active']