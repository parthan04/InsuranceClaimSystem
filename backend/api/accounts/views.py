from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import RegisterSerializer, CustomLoginSerializer


from django.contrib.auth import get_user_model


User = get_user_model()


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):

    serializer = RegisterSerializer(data=request.data)


    if serializer.is_valid():
        user = serializer.save()

        refresh = RefreshToken.for_user(user)


        return Response(
            {
            "status": "success",
            "message": "Account created successfully",
            
            "tokens": {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            },
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "last_name": user.last_name,
                "role": user.role,
                "phone": user.phone,
            },
        }, 
        status=status.HTTP_201_CREATED
        )

    return Response(
        {
           "status":"error",
           "errors":serializer.errors
        },
        status=status.HTTP_400_BAD_REQUEST
        )
    
    
class CustomLoginView(TokenObtainPairView):
    serializer_class = CustomLoginSerializer