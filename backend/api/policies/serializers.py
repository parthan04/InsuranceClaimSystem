from rest_framework import serializers
from api.admin_panel.models import Policy , PolicyTier
from .models import (
    CarPolicyApplication,
    HealthPolicyApplication,
    HomePolicyApplication,
    LifePolicyApplication,
    PolicyBenefits
)


class PolicyBenefitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PolicyBenefits
        fields = (
            "id",
            "benefit_title",
        )
class PolicyTierSerializer(serializers.ModelSerializer):
    benefits = PolicyBenefitsSerializer(many=True, read_only=True)

    total_monthly = serializers.SerializerMethodField()
    total_weekly = serializers.SerializerMethodField()
    
    class Meta:
        model = PolicyTier
        fields = (
            "id",
            "tier_name",
            "display_name",
            "is_popular",
            "coverage_amount",
            "monthly_amount",
            "weekly_amount",
            "total_monthly",
            "total_weekly",
            "benefits",
        )
    def get_total_monthly(self, obj):
        return obj.total_premium("monthly")
    
    def get_total_weekly(self, obj):
        return obj.total_premium("weekly")
        
class PolicyListSerializer(serializers.ModelSerializer):
    tiers = PolicyTierSerializer(many=True, read_only=True)

    class Meta:
        model = Policy
        fields = (
            "policy_id",
            "policy_uuid",
            "policy_type",
            "policy_name",
            "policy_description",
            "duration_months",
            "tiers",
        )


class BasePolicyApplicationSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)  # user set automatically
    policy_tier = serializers.PrimaryKeyRelatedField(queryset=PolicyTier.objects.all())
    document = serializers.FileField(required=False)

    class Meta:
        model = None 
        fields = [
            'application_id',
            'user',
            'policy_tier',
            'applied_at',
            'status',
            'payment_frequency',
            'document'
        ]
        read_only_fields = ['application_id', 'applied_at', 'status']


class CarPolicyApplicationSerializer(BasePolicyApplicationSerializer):
    class Meta(BasePolicyApplicationSerializer.Meta):
        model = CarPolicyApplication
        fields = BasePolicyApplicationSerializer.Meta.fields + [
            'vehicle_number', 'vehicle_model', 'vehicle_year', 'driver_name'
        ]


class HealthPolicyApplicationSerializer(BasePolicyApplicationSerializer):
    class Meta(BasePolicyApplicationSerializer.Meta):
        model = HealthPolicyApplication
        fields = BasePolicyApplicationSerializer.Meta.fields + [
            'full_name', 'age', 'medical_history', 'beneficiaries'
        ]


class HomePolicyApplicationSerializer(BasePolicyApplicationSerializer):
    class Meta(BasePolicyApplicationSerializer.Meta):
        model = HomePolicyApplication
        fields = BasePolicyApplicationSerializer.Meta.fields + [
            'property_address', 'property_value', 'property_type'
        ]


class LifePolicyApplicationSerializer(BasePolicyApplicationSerializer):
    class Meta(BasePolicyApplicationSerializer.Meta):
        model = LifePolicyApplication
        fields = BasePolicyApplicationSerializer.Meta.fields + [
            'full_name', 'age', 'occupation', 'dependents'
        ]