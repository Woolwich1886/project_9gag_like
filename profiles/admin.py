from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import SocialUserCreationForm
from .models import SocialUser

class SocialUserAdmin(UserAdmin):
    add_form = SocialUserCreationForm
    model = SocialUser
    #list_display = ['username', 'first_name', 'second_name', 'bio', 'country']
    fieldsets = (
        (None, {
            'fields': ('username', 'first_name', 'second_name', 'bio', 'country')
        }),
    )

admin.site.register(SocialUser, SocialUserAdmin)
# Register your models here.


