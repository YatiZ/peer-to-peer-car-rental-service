from rest_framework import serializers
from .models import Car, CarOwner, CarFeature, CustomUser, CarImages, PickupLocation


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

class CarImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model= CarImages
        fields= ['image_url','id']

class PickupLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PickupLocation
        fields = ["address", "latitude", "longitude", "is_default"]

class CarListSerializer(serializers. ModelSerializer):
    owner = UserSerializer()
    class Meta: 
        model= Car
        fields = ['id', 'name','preview_image', 'price', 'plate_number', 'location', 'owner']

class CarDetailSerializer(serializers.ModelSerializer):
    images = CarImagesSerializer(many=True, read_only=True)
    owner = UserSerializer()
    features = CarFeatureSerializer(many=True)
    
    class Meta:
        model = Car
        fields = '__all__'

class CarSerializer(serializers.ModelSerializer):
    images = CarImagesSerializer(many=True, required=False)
    features = CarFeatureSerializer(many=True, required=False)
    pickup = PickupLocationSerializer(many=True, required=False)
    owner = UserSerializer(read_only=True)
    class Meta:
        model = Car
        fields = [
            "id",
            "plate_number",
            "name",
            "owner",
            "location",
            "latitude",
            "longitude",
            "price",
            "preview_image",
            "seats",
            "transmission",
            "fuel",
            "instant_book",
            "images",
            "features",
            "pickup",
        ]
    
    def create(self, validated_data):
        images_data = validated_data.pop('images',[])
        features_data = validated_data.pop('features',[])
        pickup_data = validated_data.pop('pickup',[])

        car = Car.objects.create(**validated_data)

        for img in images_data:
            CarImages.objects.create(car=car, **img)

        for f in features_data:
            CarFeature.objects.create(car=car, **f)
        
        for p in pickup_data:
            PickupLocation.objects.create(car=car, **p)
        
        return car