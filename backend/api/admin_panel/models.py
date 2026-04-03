import uuid
from django.db import models
from api.policies.utils import generate_policy_id


class Policy(models.Model):
    POLICY_TYPE_CHOICES = [
        ('vehicle', 'Vehicle Insurance'),
        ('health', 'Health Insurance'),
        ('home', 'Home Insurance'),
        ('life', 'Life Insurance'),
    ]

    id = models.BigAutoField(
        primary_key=True, 
        editable=False
    )

    policy_uuid = models.UUIDField(
        default=uuid.uuid4,
        editable=False,
        unique=True,
        null=True,
        blank=True
    )

    policy_id = models.CharField(
        max_length=20,
        unique=True,
        default=generate_policy_id,
        editable=False
    )

    policy_type = models.CharField(
        max_length=20,
        choices=POLICY_TYPE_CHOICES,
        null=True,
        blank=True
    )

    policy_name = models.CharField(max_length=100)
    policy_description = models.TextField()

    duration_months = models.PositiveIntegerField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    policy_created_at = models.DateTimeField(auto_now_add=True)
    policy_updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.policy_id} | {self.policy_uuid} - {self.policy_name}"


class PolicyTier(models.Model):
    TIER_CHOICES = [
        ('normal', 'Normal'),
        ('Basic','Basic Coverage'),
        ('premium', 'Premium'),
    ]

    FREQUENCY_CHOICES = [
        ('monthly', 'Monthly'),
        ('weekly', 'Weekly'),
    ]
    
    policy = models.ForeignKey(
        Policy,
        related_name='tiers',
        on_delete=models.CASCADE
    )
    tier_name = models.CharField(max_length=20, choices=TIER_CHOICES)

    display_name = models.CharField(max_length=100, null=True, blank=True)
    is_popular = models.BooleanField(default=False)

    coverage_amount = models.DecimalField(max_digits=12, decimal_places=2)
    monthly_amount = models.DecimalField(max_digits=10, decimal_places=2)
    weekly_amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    def total_premium(self, frequency="monthly"):
        duration = self.policy.duration_months or 0

        if frequency == "monthly":
            return self.monthly_amount * duration
        elif frequency == "weekly":
            return self.weekly_amount * (duration * 4)
        return 0

    def __str__(self):
        return f"{self.policy.policy_name} - {self.tier_name.capitalize()}"


class UserPolicySelection(models.Model):

    user = models.ForeignKey(
        'accounts.UserAccount',
        on_delete=models.CASCADE
    )
    policy_tier = models.ForeignKey(
        PolicyTier,
        on_delete=models.CASCADE
    )
    selected_frequency = models.CharField(
        max_length=10,
        choices=PolicyTier.FREQUENCY_CHOICES,
        null=True,
        blank=True,
        help_text="Allows user to override default frequency if needed"
    )
    selected_at = models.DateTimeField(auto_now_add=True)
    
    def total_amount(self):
        return self.policy_tier.total_premium(
            self.selected_frequency or "monthly"
        )
        
    def __str__(self):
        return f"{self.user.username} - {self.policy_tier.policy.policy_name} ({self.policy_tier.tier_name})"
