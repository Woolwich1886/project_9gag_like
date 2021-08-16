from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL
# Create your models here.


def get_prof_image_path(self, filename):
    print(str(self.user))
    return 'badge/' + str(self.user) + '/prof_image.png'



class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=20, null=False, blank=False)
    second_name = models.CharField(max_length=20,null=False, blank=False)
    prof_image = models.ImageField(verbose_name='Аватар', upload_to=get_prof_image_path, default="badge/anon.jpg")
    about = models.TextField(max_length=200, null=True, blank=True)
