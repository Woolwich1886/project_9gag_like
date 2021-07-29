from django.contrib import admin
from django.contrib.admin.decorators import register
from .models import Category, Post
# Register your models here.




class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'pub_date', 'author')
    search_fields = ('title', 'author')
    list_filter = ('title', 'author', 'pub_date')


admin.site.register(Post, PostAdmin)
admin.site.register(Category)