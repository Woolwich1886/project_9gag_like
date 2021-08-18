from rest_framework import serializers
from .models import Account
from django.conf import settings
from django.utils.timezone import utc

# Сериализатор для Аккаунта


class AccountSerializer(serializers.ModelSerializer):
    badge_url = serializers.SerializerMethodField('get_image_url')

    def get_image_url(self, obj):
        return (obj.prof_image.url)
#        return ('http://localhost:8000' + obj.prof_image.url)

    class Meta:
        model = Account
        fields = [
            'user',
            'first_name',
            'second_name',
            'prof_image',
            'badge_url',
            'about'
        ]

# Сериализатор для "аватарки" Аккаунта


class AccountBadgeSerializer(serializers.ModelSerializer):
    badge_url = serializers.SerializerMethodField('get_image_url')

    def get_image_url(self, obj):
        return (obj.prof_image.url)
#        return ('http://localhost:8000' + obj.prof_image.url)

    class Meta:
        model = Account
        fields = [
            'badge_url',
        ]
