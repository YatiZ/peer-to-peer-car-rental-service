from django.urls import path # type: ignore
from .views import CarListAPIView, CarDetailAPIView,RegisterView, LoginView

urlpatterns = [
    # authentication
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('cars/', CarListAPIView.as_view(), name='car-list'),
    path('cars/<int:id>/', CarDetailAPIView.as_view(), name='car-detail'),
]