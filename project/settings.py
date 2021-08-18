"""
Django settings for project project.

Generated by 'django-admin startproject' using Django 3.2.5.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from pathlib import Path
import os
import cloudinary
import cloudinary.uploader
import cloudinary.api
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-ewo)3o64shxms_m@_cd&%!2ttf7ug&m$+s7^%%3*_k^#cx07x3'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False
ALLOWED_HOSTS = ['http://localhost:3000/', '127.0.0.1',
                 'http://localhost:8000/', 'localhost', 'social-soc1.herokuapp.com']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # приложения
    # 'django_cleanup',
    'crispy_forms',
    'corsheaders',
    'rest_framework',
    'cloudinary_storage',
    'cloudinary',
    # мои приложения
    'wall',
    'account',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # подключил папку шаблонов, потому что она не находится в папке приложения
        'DIRS': [os.path.join(BASE_DIR, "templates")],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'project.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        # минимальная длина пароля 1
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {'min_length': 1}
    },
    # отключить проверку часто встречающихся паролей{
    #    'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    # },
    # чтобы пароль мог содержать одни цифры{
    # 'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    #  },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

LANGUAGES = [
    ('en', 'English'),
    ('ru', 'Russian'),
]

TIME_ZONE = 'Europe/Moscow'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static")
]
STATIC_ROOT = os.path.join(BASE_DIR, "static-root")

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# мои настройки
CLOUDINARY_STORAGE = {
    'CLOUD_NAME': 'dsvbrtzlb',
    'API_KEY': '624722967466157',
    'API_SECRET': '6Em2xwnKtUptFzxs2IEqzwlCddQ'
}


LOGOUT_URL = '/'
LOGOUT_REDIRECT_URL = '/'
#CORS_ORIGIN_WHITELIST = ['http://localhost:3000']
REST_FRAMEWORK = {

    'DEFAULT_PERMISSION_CLASES': [
        # 'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly',
        'rest_framework.permissions.IsAuthenticated'
    ]
}

CRISPY_TEMPLATE_PACK = 'bootstrap4'
CORS_ORIGIN_ALLOW_ALL = True
CORS_URLS_REGEX = r'^/api/.*$'
#MEDIA_ROOT = os.path.join(BASE_DIR, "images")
MEDIA_URL = 'images/'
DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'
POST_RATE_OPTIONS = ['upvote', 'downvote']
DEFAULT_RENDERER_CLASSES = [
    'rest_framework.renderers.JSONRenderer',
]
DEFAULT_AUTHENTICATION_CLASSES = [
    # 'rest_framework.authentication.BasicAuthentication'
    # 'rest_framework.authentication.TokenAuthentication',
    'rest_framework.authentication.SessionAuthentication'
]
# только при дебаге
if DEBUG:
    DEFAULT_RENDERER_CLASSES += [
        'rest_framework.renderers.BrowsableAPIRenderer',
    ]
# аутентификация для реакта
    DEFAULT_AUTHENTICATION_CLASSES += [
        'project.rest_api.test.TestAuthentication'
    ]
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': DEFAULT_AUTHENTICATION_CLASSES,
    'DEFAULT_RENDERER_CLASSES': DEFAULT_RENDERER_CLASSES

}
