from django.contrib import admin
from .models import Policy, PolicyTier
from api.policies.models import PolicyBenefits


class PolicyTierInline(admin.TabularInline):
    model = PolicyTier
    extra = 1


class PolicyAdmin(admin.ModelAdmin):
    list_display = ("policy_id", "policy_uuid", "policy_name", "policy_type", "is_active")
    inlines = [PolicyTierInline]


admin.site.register(Policy, PolicyAdmin)

class PolicyBenefitsAdmin(admin.TabularInline):
    model = PolicyBenefits
    extra = 1

class PolicyTierAdmin(admin.ModelAdmin):
    list_display = ("policy", "tier_name", "coverage_amount", "monthly_amount", "weekly_amount", "is_popular")
    inlines = [PolicyBenefitsAdmin]

admin.site.register(PolicyTier, PolicyTierAdmin)