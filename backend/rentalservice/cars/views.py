from rest_framework import generics, status # type: ignore
from rest_framework.response import Response # type:ignore
from rest_framework.permissions import AllowAny # type: ignore
from .models import Car
from rest_framework_simplejwt.tokens import RefreshToken # type: ignore
from .serializers import CarSerializer, UserSerializer, RegisterSerializer, LoginSerializer
from django.contrib.auth import get_user_model # type: ignore
from django.contrib.auth import authenticate

#accounts views
User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

class GetUserAcc(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception =True)
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        user = authenticate(request, email=email, password=password)
        if user:
            refresh = RefreshToken.for_user(user) 
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'username': user.username,
                }
            },status= status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class CarListAPIView(generics.ListAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer

class CarDetailAPIView(generics.RetrieveAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    lookup_field = 'id'