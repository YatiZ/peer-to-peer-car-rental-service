
from django.contrib.auth.models import AbstractUser # type: ignore
from django.db import models # type: ignore
from django.conf import settings

# accounts
class CustomUser(AbstractUser):
    USER_TYPE_CHOICES = [
        ('owner', 'Owner'),
        ('renter', 'Renter'),
    ]
    email = models.EmailField(unique=True, null=True, blank=True)
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    rating = models.FloatField(default=0)
    is_verified = models.BooleanField(default=False)
    joined_date = models.DateField(auto_now_add=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]


class CarOwner(models.Model):
    name = models.CharField(max_length=100)
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    
    def __str__(self):
        return f"{self.name} ({self.rating})"

class Car(models.Model):
    TRANSMISSION_CHOICES = [
        ('automatic', 'Automatic'),
        ('manual', 'Manual'),
    ]
    
    FUEL_CHOICES = [
        ('gasoline', 'Gasoline'),
        ('diesel', 'Diesel'),
        ('electric', 'Electric'),
        ('hybrid', 'Hybrid'),
    ]
    
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE, limit_choices_to={'user_type': 'owner'}, related_name='cars')
    location = models.CharField(max_length=100)
    distance = models.CharField(max_length=20)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.URLField(max_length=500)
    seats = models.PositiveIntegerField()
    transmission = models.CharField(max_length=10, choices=TRANSMISSION_CHOICES)
    fuel = models.CharField(max_length=10, choices=FUEL_CHOICES)
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    review_count = models.PositiveIntegerField()
    instant_book = models.BooleanField(default=False)
    
    def __str__(self):
        return self.name

class CarFeature(models.Model):
    car = models.ForeignKey(Car, related_name='features', on_delete=models.CASCADE)
    feature = models.CharField(max_length=100)
    
    def __str__(self):
        return self.feature