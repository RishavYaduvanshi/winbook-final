from distutils.command.upload import upload
from django.db import models
from django.contrib.auth.models import AbstractUser as _User

# Create your models here.

class User(_User):
    
    bio = models.TextField(null=True,blank=True)
    dp = models.ImageField(upload_to='dp/',null=True,blank=True)
    cover = models.ImageField(upload_to='covers/',null=True,blank=True)
