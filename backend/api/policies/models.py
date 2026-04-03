from django.db import models
from api.accounts.models import UserAccount
from api.admin_panel.models import PolicyTier
from api.policies.utils import generate_application_id

def policy_application_upload_path(instance, filename):

    policy_type = instance._meta.model_name 
    return f'policy_applications/{policy_type}/{instance.user.id}/{filename}'


class PolicyApplication(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    application_id = models.CharField(max_length=20, default=generate_application_id, editable=False, unique=True)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, db_index=True)
    policy_tier = models.ForeignKey(PolicyTier, on_delete=models.CASCADE, db_index=True)
    applied_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    payment_frequency = models.CharField(max_length=10, null=True, blank=True)
    document = models.FileField(
        upload_to=policy_application_upload_path,
        null=True,
        blank=True,
        help_text="Upload proof document (ID, medical record, vehicle papers, etc.)"
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'policy_tier'],
                condition=models.Q(status='pending'),
                name='unique_pending_application'
            )
        ]

    def __str__(self):
        return f"{self.application_id} - {self.user.username} - {self.policy_tier.policy.policy_name}"


class PolicyBenefits(models.Model):
    policy_tier = models.ForeignKey(
        PolicyTier, 
        on_delete=models.CASCADE, 
        db_index=True,
        related_name='benefits'
        )
    benefit_title = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.policy_tier.policy.policy_name} - {self.benefit_title}"


class CarPolicyApplication(PolicyApplication):
    vehicle_number = models.CharField(max_length=20)
    vehicle_model = models.CharField(max_length=50)
    vehicle_year = models.PositiveIntegerField()
    driver_name = models.CharField(max_length=100)

    class Meta:
        verbose_name = "Car Policy Application"
        verbose_name_plural = "Car Policy Applications"


class HealthPolicyApplication(PolicyApplication):
    full_name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    medical_history = models.TextField(blank=True, null=True)
    beneficiaries = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name = "Health Policy Application"
        verbose_name_plural = "Health Policy Applications"


class HomePolicyApplication(PolicyApplication):
    property_address = models.TextField()
    property_value = models.DecimalField(max_digits=12, decimal_places=2)
    property_type = models.CharField(max_length=50)

    class Meta:
        verbose_name = "Home Policy Application"
        verbose_name_plural = "Home Policy Applications"


class LifePolicyApplication(PolicyApplication):
    full_name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    occupation = models.CharField(max_length=50)
    dependents = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Life Policy Application"
        verbose_name_plural = "Life Policy Applications"
