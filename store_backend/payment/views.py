from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from store.models import Product
from core import settings

stripe_api_key=settings.STRIPE_SECRET_KEY

@api_view[""]
