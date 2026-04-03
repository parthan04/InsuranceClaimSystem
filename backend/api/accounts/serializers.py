import re
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers  import TokenObtainPairSerializer

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    
    email = serializers.EmailField(required=True)

    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
            "password2",
            "last_name",
            "phone",
        ]

        extra_kwargs = {
            "password": {"write_only": True}
        }

    #  Validate Password Match
    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError(
                {"password": "Passwords do not match."}
            )
        return attrs

    #  Validate Strong Password
    def validate_password(self, value):
        validate_password(value)
        return value
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email is already in use.")
        return value
    
    def validate_phone(self,value):
        if value == "":
            return value
        
        if not re.fullmatch(r'^\d{10}$', value):
            raise serializers.ValidationError("Phone number must be 10 digits.")
        return value

    #  Create User
    def create(self, validated_data):
        validated_data.pop("password2", None)

        user = User.objects.create_user(
            **validated_data,
            role="user"
        )

        return user
    
    
class CustomLoginSerializer(TokenObtainPairSerializer):
    
    def validate(self,attrs):
        data = super().validate(attrs)
        
        user = self.user
        
        data["user"] = {
            "id":self.user.id,
            "username": self.user.username,
            "email": self.user.email,
            "role": self.user.role,
            "phone": self.user.phone,
        }

        return data




