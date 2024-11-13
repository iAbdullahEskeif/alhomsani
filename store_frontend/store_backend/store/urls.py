from django.urls import path
from django.views.generic import TemplateView
from . import views
app_name='store'
urlpatterns=[
    path('',views.home,name='index'),
    path('test',views.test,name="test")
]
