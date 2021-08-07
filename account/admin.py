from django.contrib import admin
from django.contrib.admin.decorators import register
from django.contrib.admin.options import TabularInline
from .models import Account
# Register your models here.



class AccountAdmin(admin.ModelAdmin):
    list_display = ('user', 'first_name', 'second_name', 'prof_image', 'about')
    search_fields = ('user', 'first_name', 'second_name')


admin.site.register(Account, AccountAdmin)
