from rest_framework import serializers
from store.models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            'id', 'category', 'name', 'description', 'price',
            'stock_quantity', 'sku', 'created_at', 'updated_at',
            'availability', 'image')
