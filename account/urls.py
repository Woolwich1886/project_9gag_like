from django.urls import path
from django.contrib.auth import views as auth_views
from .views import login_view, reg_view

urlpatterns = [
    #path('api/', api_postview),
    path('login/', login_view),
    #path('logout/', logout_view),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('registration/', reg_view),
]
