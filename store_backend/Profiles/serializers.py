'''from rest_framework import serializers
from .models import Profile
from store.models import Product

class ProfileSerializer(serializers.ModelSerializer):
    favorite_cars = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), many=True
    )

    class Meta:
        model = Profile
        fields = ['user', 'name', 'profile_picture', 'contact_info', 'favorite_cars']
'''

from rest_framework import serializers
from .models import Profile, ActivityLog
from store.models import Product  # Importing the Product model for favorites & bookmarks

class ActivityLogSerializer(serializers.ModelSerializer):
    """Serializer for activity log entries."""
    class Meta:
        model = ActivityLog
        fields = ['profile', 'product', 'action', 'timestamp']
        read_only_fields = ['profiled', 'product', 'timestamp']

class ProfileSerializer(serializers.ModelSerializer):
    """Serializer for the user profile, including favorites, bookmarks, and activity log."""
    
    favorite_cars = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Product.objects.all(), required=False
    )
    bookmarked_cars = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Product.objects.all(), required=False
    )
    
    activity_log = ActivityLogSerializer(many=True, read_only=True, source='activitylog_set')

    class Meta:
        model = Profile
        fields = ['user', 'name', 'location', 'contact_info', 'bio', 'profile_picture', 
                  'favorite_cars', 'bookmarked_cars', 'activity_log', 'member_since']
        read_only_fields = ['user', 'member_since']
