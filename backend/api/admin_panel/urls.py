from django.urls import path
from .views import AdminPolicyCreateView

app_name = 'admin_panel'

urlpatterns = [
    path('policy/create/', AdminPolicyCreateView.as_view(), name='admin-policy-create'),
  
]   