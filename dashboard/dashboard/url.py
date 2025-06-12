from django.urls import path

from .views import InsightListAPIView

urlpatterns = [
    path('insights/', InsightListAPIView.as_view(), name='insight-list'),
]
