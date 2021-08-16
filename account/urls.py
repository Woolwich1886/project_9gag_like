from django import urls
from django.urls import path
from .views import logout_view, profile_view, login_view, registration_view, edit_profile_view

urlpatterns = [
    path('profile/<str:username>/', profile_view, name='profile'),
    path('profile/<str:username>/edit', edit_profile_view, name='edit'),
    path('login', login_view, name='login' ),
    path('logout', logout_view, name='logout'),
    path('registration', registration_view, name='registration'),
    
]

