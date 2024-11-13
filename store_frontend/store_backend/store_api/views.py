from django.shortcuts import render
from rest_framework import generics
from store.models import Product
from .serializers import ProductSerializer
from rest_framework.permissions import IsAdminUser,IsAuthenticatedOrReadOnly,DjangoModelPermissions
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly,BasePermission,IsAuthenticated,SAFE_METHODS


class ProductDetail(generics.RetrieveDestroyAPIView):
      queryset=Product.objects.all()
      serializer_class=ProductSerializer 
      # permission_classes=[IsAuthenticated]


class ProductList(generics.ListCreateAPIView):
#     permission_classes=[IsAuthenticated]
    queryset=Product.objects.filter(availability='in_stock')
    serializer_class=ProductSerializer 
