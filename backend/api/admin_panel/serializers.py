from rest_framework import serializers
from .models import Policy, PolicyTier, UserPolicySelection
from api.accounts.models import UserAccount


class PolicyTierSerializer(serializers.ModelSerializer):
    class Meta:
        model = PolicyTier
        fields = '__all__'

    def validate(self, attrs):
        coverage = attrs.get("coverage_amount")
        monthly_amount = attrs.get("monthly_amount")
        weekly_amount = attrs.get("weekly_amount")

        if coverage <= 0:
            raise serializers.ValidationError({"coverage_amount": "Coverage must be positive."})
        if monthly_amount <= 0:
            raise serializers.ValidationError({"monthly_amount": "Premium must be positive."})
        if weekly_amount <= 0:
            raise serializers.ValidationError({"weekly_amount": "Premium must be positive."})
        if monthly_amount > coverage:
            raise serializers.ValidationError("Monthly Amount cannot exceed coverage.")
        if weekly_amount > coverage:
            raise serializers.ValidationError("Weekly Amount cannot exceed coverage.")
        return attrs


class AdminPolicySerializer(serializers.ModelSerializer):
    tiers = PolicyTierSerializer(many=True)

    class Meta:
        model = Policy
        fields = '__all__'
        read_only_fields = ('policy_id', 'policy_created_at', 'policy_updated_at')

    def validate_duration_months(self, value):
        if value is not None and value <= 0:
            raise serializers.ValidationError("Duration must be greater than zero.")
        return value

    def create(self, validated_data):
        tiers_data = validated_data.pop('tiers', [])
        policy = Policy.objects.create(**validated_data)
        for tier_data in tiers_data:
            PolicyTier.objects.create(policy=policy, **tier_data)
        return policy

    def update(self, instance, validated_data):
        tiers_data = validated_data.pop('tiers', [])
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        for tier_data in tiers_data:
            tier_id = tier_data.get('id')
            if tier_id:
                tier = PolicyTier.objects.get(id=tier_id, policy=instance)
                for attr, value in tier_data.items():
                    setattr(tier, attr, value)
                tier.save()
            else:
                PolicyTier.objects.create(policy=instance, **tier_data)

        return instance


class UserPolicySelectionSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=UserAccount.objects.all())
    policy_tier = serializers.PrimaryKeyRelatedField(queryset=PolicyTier.objects.all())

    class Meta:
        model = UserPolicySelection
        fields = '__all__'

    def validate(self, attrs):
        tier = attrs.get('policy_tier')
        selected_frequency = attrs.get('selected_frequency') 

        if selected_frequency not in ['monthly', 'weekly']:
            raise serializers.ValidationError("Invalid payment frequency for this tier.")
        attrs['selected_frequency'] = selected_frequency
        return attrs
