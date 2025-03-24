from django.shortcuts import render
from rest_framework import generics
from store.models import Product
from .serializers import ProductSerializer
from rest_framework.permissions import IsAdminUser,IsAuthenticatedOrReadOnly,DjangoModelPermissions
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly,BasePermission,SAFE_METHODS

class ProductDeletePermission(BasePermission):
      message= 'You do not have the permission'
      def has_permission(self, request, view):
         #  if request.method in SAFE_METHODS:
                #return True
           #return True
           return request.user.username=='Abdullah_Eskeif'  
      
      

class ProductDetail(generics.RetrieveDestroyAPIView,ProductDeletePermission):
      queryset=Product.objects.all()
      serializer_class=ProductSerializer 

   

class ProductList(generics.ListCreateAPIView):
    queryset=Product.objects.filter(availability='in_stock')
    serializer_class=ProductSerializer 
