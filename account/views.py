from django.shortcuts import render
from django.http import Http404
# Create your views here.

from .models import Account


def profile_view(request, username, *args, **kwargs):
    qs = Account.objects.filter(user__username=username)
    if not qs.exists():
        raise Http404
    item = qs.first()
    context = {'username': username,
                'account': item}
    return render(request, "pages/profile.html", context)
