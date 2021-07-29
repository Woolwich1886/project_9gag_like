from django.db.models import fields
from rest_framework import serializers
from .models import Category, Post
from django.conf import settings


POST_RATE_OPTIONS = settings.POST_RATE_OPTIONS


class PostRateSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    vote_type = serializers.CharField()


    def validate_action(self, value):
        value = value.lower().strip() 
        if not value in POST_RATE_OPTIONS:
            raise serializers.ValidationError("Такого варианта действий нет, либо авпоут, либо даунвоут")
        return value
    

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']


class PostSerializer(serializers.ModelSerializer):
    #image = serializers.ImageField(max_length=False, use_url=True)
    image_url = serializers.SerializerMethodField('get_image_url')
    # = serializers.RelatedField(read_only=True)
    category = serializers.StringRelatedField()
    author = serializers.StringRelatedField()
    rating = serializers.SerializerMethodField('get_rating')
    def get_image_url(self, obj):
        return ('http://localhost:8000' + obj.image.url)
    
    def get_rating(self, obj):
        return obj.upvotes-obj.downvotes

    class Meta:
        model = Post
        fields = ['id', 
        'title', 
        'category', 
        'pub_date', 
        'author', 
        'image',
        'image_url',
        'rating',
        'upvotes',
        'downvotes']
    