from django.shortcuts import render
from rest_framework import generics
from store.models import Product
from .serializers import ProductSerializer
from rest_framework.permissions import IsAdminUser,IsAuthenticatedOrReadOnly,DjangoModelPermissions
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly,BasePermission,SAFE_METHODS
from drf_spectacular.utils import extend_schema,OpenApiParameter
 
      
      

class ProductDetail(generics.RetrieveDestroyAPIView):
      queryset=Product.objects.all()
      serializer_class=ProductSerializer 

   

class ProductList(generics.ListCreateAPIView):
    queryset=Product.objects.filter(availability='in_stock')
    serializer_class=ProductSerializer 


@extend_schema(
    parameters=[
        OpenApiParameter(name='car_type', description='Search car by type', required=False, type=str),
    ]
)
class FilteredProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        car_type = self.request.query_params.get('car_type')
        if car_type:
            return Product.objects.filter(car_type=car_type)
        return Product.objects.all()