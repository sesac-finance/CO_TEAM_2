from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User

from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = ('username', 'password', 'bank', "bank_account","name")

#{"username": "sim", "password" : "1111", "passwordConfirmation" : "1111","bank" : "오픈뱅킹","bank_account":"124567", "name" : "심혜지"}




