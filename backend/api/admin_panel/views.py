from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from api.accounts.permissions import IsAdmin
from .models import Policy
from .serializers import AdminPolicySerializer


class AdminPolicyCreateView(CreateAPIView):
    queryset = Policy.objects.all()
    serializer_class = AdminPolicySerializer
    permission_classes = [IsAuthenticated, IsAdmin]
