from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    bank = models.CharField(max_length=32, null= True)
    name = models.CharField(max_length=32, null= True)
    