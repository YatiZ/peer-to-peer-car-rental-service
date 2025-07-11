from django.db import models


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
    owner = models.ForeignKey(CarOwner, on_delete=models.CASCADE)
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