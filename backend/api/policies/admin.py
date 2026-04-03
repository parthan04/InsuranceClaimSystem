from django.contrib import admin
from .models import PolicyApplication, CarPolicyApplication, HealthPolicyApplication, HomePolicyApplication, LifePolicyApplication
admin.site.register(PolicyApplication)
admin.site.register(CarPolicyApplication)
admin.site.register(HealthPolicyApplication)
admin.site.register(HomePolicyApplication)
admin.site.register(LifePolicyApplication)

