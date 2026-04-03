from django.contrib import admin
from .models import UserAccount


class UserAccountAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'last_name', 'role', 'phone')
    search_fields = ('username', 'email', 'last_name')
    list_filter = ('role',)
admin.site.register(UserAccount, UserAccountAdmin)
