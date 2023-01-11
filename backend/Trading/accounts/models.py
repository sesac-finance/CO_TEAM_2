from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    bank = models.CharField(max_length=32, null= True)  #은행명
    bank_account = models.CharField(max_length=32, null=True)  #은행계좌 
    name = models.CharField(max_length=32, null= True)
    