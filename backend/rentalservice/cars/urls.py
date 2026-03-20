from django.urls import path # type: ignore
from .views import CarListAPIView, CarDetailAPIView,RegisterView, LoginView, GetUserAcc, LogoutView, GetMeView

urlpatterns = [
    # authentication
    path('users/',GetUserAcc.as_view(), name="getuser"),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('me/',GetMeView.as_view(),name='get-me'),
    path('cars/', CarListAPIView.as_view(), name='car-list'),
    path('cars/<slug:plate_number>/', CarDetailAPIView.as_view(), name='car-detail'),
]