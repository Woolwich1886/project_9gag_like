from django.db.models import fields
from rest_framework import serializers
from .models import Category, Comment, Post
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
    
class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    text = serializers.StringRelatedField()
    class Meta:
        model = Comment
        fields = [
            'user',
            'comment_date',
            'text'
        ]


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
    comments_quantity = serializers.SerializerMethodField('get_comments_quantity')
    comments = serializers.SerializerMethodField('get_comments')
    

    def get_comments(self, obj):
        cms = obj.comments.all()
        cms_ser = CommentSerializer(cms, many=True)
        return cms_ser.data


    def get_vote(self, obj):
        if self.context.get('req_user') in obj.upvotes.all():
            return 'UP'
        elif self.context.get('req_user') in obj.downvotes.all():
            return 'DOWN'
        return 'NO VOTE'

    def get_comments_quantity(self, obj):
        return obj.comments.count()

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
        'comments_quantity',
        'comments'
           ]
    