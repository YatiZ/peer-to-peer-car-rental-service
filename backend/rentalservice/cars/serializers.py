from rest_framework import serializers
from .models import Car, CarOwner, CarFeature

class CarFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarFeature
        fields = ['feature']

class CarOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarOwner
        fields = ['name', 'rating']

class CarSerializer(serializers.ModelSerializer):
    owner = CarOwnerSerializer()
    features = CarFeatureSerializer(many=True)
    
    class Meta:
        model = Car
        fields = [
            'id', 'name', 'owner', 'location', 'distance', 'price', 
            'image', 'seats', 'transmission', 'fuel', 'rating', 
            'review_count', 'features', 'instant_book'
        ]