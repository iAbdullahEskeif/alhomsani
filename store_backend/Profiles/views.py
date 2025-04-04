
'''from store.models import Product
from rest_framework.permissions import IsAdminUser,IsAuthenticatedOrReadOnly,DjangoModelPermissions
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly,BasePermission,SAFE_METHODS
from rest_framework import generics, permissions
from .models import Profile
from .serializers import ProfileSerializer

class ProfileDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile'''

from rest_framework import status, generics, pagination
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Profile, ActivityLog
from store.models import Product
from .serializers import ProfileSerializer, ActivityLogSerializer

class IsOwnerOfProfile(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user




class AddToFavoritesView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        profile = request.user.profile
        product = get_object_or_404(Product, id=self.kwargs['product_id'])

        if product not in profile.favorite_cars.all():
            profile.favorite_cars.add(product)
            ActivityLog.objects.create(
                profile=profile,
                action='favorite',
                product=product
            )
            return Response({"message": f"{product.name} added to favorites."}, status=status.HTTP_200_OK)
        return Response({"message": "Already in favorites."}, status=status.HTTP_400_BAD_REQUEST)


class RemoveFromFavoritesView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        profile = request.user.profile
        product = get_object_or_404(Product, id=self.kwargs['product_id'])

        if product in profile.favorite_cars.all():
            profile.favorite_cars.remove(product)
            # You can log this removal as an optional action if needed
            return Response({"message": f"{product.name} removed from favorites."}, status=status.HTTP_200_OK)
        return Response({"message": "Not in favorites."}, status=status.HTTP_400_BAD_REQUEST)


class AddToBookmarksView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        profile = request.user.profile
        product = get_object_or_404(Product, id=self.kwargs['product_id'])

        if product not in profile.bookmarked_cars.all():
            profile.bookmarked_cars.add(product)
            ActivityLog.objects.create(
                profile=profile,
                action='bookmark',
                product=product
            )
            return Response({"message": f"{product.name} bookmarked."}, status=status.HTTP_200_OK)
        return Response({"message": "Already bookmarked."}, status=status.HTTP_400_BAD_REQUEST)


class RemoveFromBookmarksView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        profile = request.user.profile
        product = get_object_or_404(Product, id=self.kwargs['product_id'])

        if product in profile.bookmarked_cars.all():
            profile.bookmarked_cars.remove(product)
            # Optional: create log entry if desired
            return Response({"message": f"Bookmark removed from {product.name}."}, status=status.HTTP_200_OK)
        return Response({"message": "Not bookmarked."}, status=status.HTTP_400_BAD_REQUEST)


class ActivityLogPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 50


class ActivityLogListView(generics.ListAPIView):
    serializer_class = ActivityLogSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = ActivityLogPagination

    def get_queryset(self):
        profile = self.request.user.profile
        return profile.activity_logs.all().order_by("-timestamp")
    

class UserProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated, IsOwnerOfProfile]
    serializer_class = ProfileSerializer

    def get_object(self):
        return self.request.user.profile
