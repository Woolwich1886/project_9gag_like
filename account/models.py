from django.db import models
from django.conf import settings
from django.dispatch import receiver
User = settings.AUTH_USER_MODEL
# Create your models here.


def get_prof_image_path(self, filename):
    print(str(self.user))
    return 'badge/' + str(self.user) + '/prof_image.png'


# Модель Аккаунта (один к одному c моделю Юзер)
class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=20, null=False, blank=False)
    second_name = models.CharField(max_length=20, null=False, blank=False)
    prof_image = models.ImageField(
        verbose_name='Аватар', upload_to=get_prof_image_path, default="badge/anon.png")
    about = models.TextField(max_length=200, null=True, blank=True)


# Сигнал при сохранении аккаунта для удаления старой аватарки
@receiver(models.signals.pre_save, sender=Account)
def delete_prof_image(sender, instance, *args, **kwargs):
    if instance.id:
        try:
            old_image = Account.objects.get(id=instance.id).prof_image
        except Account.DoesNotExist:
            return
        else:
            new_image = instance.prof_image
            if old_image and old_image.url != new_image.url:
                old_image.delete(save=False)
