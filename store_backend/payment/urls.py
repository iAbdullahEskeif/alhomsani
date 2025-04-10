from django.urls import path
from .views import create_payment_intent



app_name='payments'

url_patterns=[
    path('intent/',create_payment_intent,name='create_intent')
]