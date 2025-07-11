from django.urls import path # type: ignore
from .views import CarListAPIView, CarDetailAPIView

urlpatterns = [
    path('cars/', CarListAPIView.as_view(), name='car-list'),
    path('cars/<int:id>/', CarDetailAPIView.as_view(), name='car-detail'),
]