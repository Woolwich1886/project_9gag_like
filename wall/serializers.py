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
    upvotes = serializers.SerializerMethodField('get_upvotes')
    downvotes = serializers.SerializerMethodField('get_downvotes')
    vote = serializers.SerializerMethodField('get_vote')


    def get_vote(self, obj):
        if self.context.get('req_user') in obj.upvotes.all():
            return 'UP'
        elif self.context.get('req_user') in obj.downvotes.all():
            return 'DOWN'
        return 'NO VOTE'

    

    def get_image_url(self, obj):
        return ('http://localhost:8000' + obj.image.url)
    
    
    
    def get_upvotes(self, obj):
        return obj.upvotes.count()
    def get_downvotes(self, obj):
        return obj.downvotes.count()
    def get_rating(self, obj):
        return obj.upvotes.count()-obj.downvotes.count()
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
        'downvotes',
        'vote',
           ]
    