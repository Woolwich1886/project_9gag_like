from django.contrib import admin
from django.contrib.admin.decorators import register
from django.contrib.admin.options import TabularInline
from .models import Category, Post, Upvote, Downvote
# Register your models here.

class UpvoteAdmin(TabularInline):
    model = Upvote


class DownvoteAdmin(TabularInline):
    model = Downvote


class PostAdmin(admin.ModelAdmin):
    inlines = [UpvoteAdmin, DownvoteAdmin]
    list_display = ('title', 'category', 'pub_date', 'author')
    search_fields = ('title', 'author')
    list_filter = ('title', 'author', 'pub_date')


admin.site.register(Post, PostAdmin)
admin.site.register(Category)
admin.site.register(Upvote)
admin.site.register(Downvote)