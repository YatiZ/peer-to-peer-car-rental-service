from rest_framework import serializers
from .models import Car, CarOwner, CarFeature, CustomUser


# accounts serializers
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model= CustomUser
        fields = ['id', 'email', 'username', 'user_type', 'avatar', 'phone', 'location', 'rating', 'joined_date', 'is_verified']
        read_only_fields = ['id', 'rating', 'joined_date', 'is_verified']


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'password', 'user_type', 'phone', 'location', 'avatar']
    
    def create(self, validated_data):
        user= CustomUser.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'],
            user_type=validated_data['user_type'],
            phone=validated_data.get('phone'),
            location=validated_data.get('location'),
            avatar=validated_data.get('avatar'),
        )
        return user


# car list serializers
class CarFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarFeature
        fields = ['feature']

class CarOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarOwner
        fields = ['name', 'rating']

class CarSerializer(serializers.ModelSerializer):
    owner = UserSerializer()
    features = CarFeatureSerializer(many=True)
    
    class Meta:
        model = Car
        fields = [
            'id', 'name', 'owner', 'location', 'distance', 'price', 
            'image', 'seats', 'transmission', 'fuel', 'rating', 
            'review_count', 'features', 'instant_book'
        ]