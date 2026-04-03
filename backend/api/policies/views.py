from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import viewsets
from rest_framework.permissions import AllowAny,IsAuthenticated

from api.admin_panel.models import Policy
from .serializers import (
    PolicyListSerializer,
    CarPolicyApplicationSerializer,
    HealthPolicyApplicationSerializer,
    HomePolicyApplicationSerializer,
    LifePolicyApplicationSerializer
)
from .models import (
    CarPolicyApplication,
    HealthPolicyApplication,
    HomePolicyApplication,
    LifePolicyApplication
)

# FOR POLICY LIST
class PolicyListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = PolicyListSerializer
 
    def get_queryset(self):
        return Policy.objects.filter(is_active=True).prefetch_related("tiers")

# FOR POLICY DETAILED PAGE
class PolicyDetailView(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = PolicyListSerializer
    lookup_field = "policy_uuid"
    lookup_url_kwarg = "policy_uuid"

    def get_queryset(self):
        return Policy.objects.filter(is_active=True).prefetch_related("tiers")


class BasePolicyApplicationViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CarPolicyApplicationViewSet(BasePolicyApplicationViewSet):
    queryset = CarPolicyApplication.objects.all()
    serializer_class = CarPolicyApplicationSerializer


class HealthPolicyApplicationViewSet(BasePolicyApplicationViewSet):
    queryset = HealthPolicyApplication.objects.all()
    serializer_class = HealthPolicyApplicationSerializer


class HomePolicyApplicationViewSet(BasePolicyApplicationViewSet):
    queryset = HomePolicyApplication.objects.all()
    serializer_class = HomePolicyApplicationSerializer


class LifePolicyApplicationViewSet(BasePolicyApplicationViewSet):
    queryset = LifePolicyApplication.objects.all()
    serializer_class = LifePolicyApplicationSerializer

