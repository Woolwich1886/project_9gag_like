from django.contrib.auth import get_user_model
from rest_framework import authentication


User = get_user_model()


class TestAuthentication(authentication.BasicAuthentication):
    def authenticate(self, request):
        qs = User.objects.all()
        user = User.objects.get(id=2)
        return (user, None)