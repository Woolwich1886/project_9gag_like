from django.contrib import admin
from django.contrib.admin.decorators import register
from django.contrib.admin.options import TabularInline
from .models import Category, Comment, Post, Upvote, Downvote
# Register your models here.

class CommentAdmin(TabularInline):
    model = Comment


class UpvoteAdmin(TabularInline):
    model = Upvote


class DownvoteAdmin(TabularInline):
    model = Downvote


class PostAdmin(admin.ModelAdmin):
    inlines = [UpvoteAdmin, DownvoteAdmin, CommentAdmin]
    list_display = ('title', 'category', 'pub_date', 'user')
    search_fields = ('title', 'user')
    list_filter = ('title', 'user', 'pub_date')


admin.site.register(Post, PostAdmin)
admin.site.register(Category)
admin.site.register(Upvote)
admin.site.register(Downvote)
admin.site.register(Comment)