from django.shortcuts import render
from rest_framework import generics
from store.models import Product
from .serializers import ProductSerializer
from rest_framework.permissions import IsAdminUser,IsAuthenticatedOrReadOnly,DjangoModelPermissions
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly,BasePermission,SAFE_METHODS
 
      
      

class ProductDetail(generics.RetrieveDestroyAPIView):
      queryset=Product.objects.all()
      serializer_class=ProductSerializer 

   

class ProductList(generics.ListCreateAPIView):
    queryset=Product.objects.filter(availability='in_stock')
    serializer_class=ProductSerializer 
