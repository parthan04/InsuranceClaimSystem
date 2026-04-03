from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import (
    PolicyListView,
    CarPolicyApplicationViewSet,
    HealthPolicyApplicationViewSet,
    HomePolicyApplicationViewSet,
    LifePolicyApplicationViewSet,
    PolicyDetailView
)

app_name = 'policies'

router = DefaultRouter()
router.register(r'applications/vehicle', CarPolicyApplicationViewSet, basename='user-car-application')
router.register(r'applications/health', HealthPolicyApplicationViewSet, basename='user-health-application')
router.register(r'applications/home', HomePolicyApplicationViewSet, basename='user-home-application')
router.register(r'applications/life', LifePolicyApplicationViewSet, basename='user-life-application')

urlpatterns = [
    path('policy_lists/', PolicyListView.as_view(), name='policy-list'),
    path('policy_applications/', include(router.urls)),
    path('policy_lists/<uuid:policy_uuid>/', PolicyDetailView.as_view(), name='policy-detail'),
]