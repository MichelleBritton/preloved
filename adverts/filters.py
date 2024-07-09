# filters.py
from django_filters import rest_framework as filters
from .models import Advert

class AdvertFilter(filters.FilterSet):
    category = filters.CharFilter(field_name="category", lookup_expr='icontains')
    location = filters.CharFilter(field_name="location", lookup_expr='icontains')

    class Meta:
        model = Advert
        fields = ['category', 'location']
