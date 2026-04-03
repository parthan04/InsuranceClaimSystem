from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('api.accounts.urls', namespace='accounts')),
    path('api/claims/', include('api.claims.urls', namespace='claims')),
    path('api/policies/', include('api.policies.urls', namespace='policies')),
    path('api/admin/', include('api.admin_panel.urls', namespace='admin_panel')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)