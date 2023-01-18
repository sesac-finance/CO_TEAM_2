from rest_framework import serializers
from .models import UsrTrnInfo, ModAct, ModTrs, UsrPrfInfo, AccountsUser, ModPrfInfo

class UserActSerializer(serializers.ModelSerializer):

    class Meta:
        model = UsrTrnInfo
        fields = ('__all__')

class ModActSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModAct
        fields = ('__all__')

class ModTrsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModTrs
        fields = ('__all__')

class UserPrfSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsrPrfInfo
        fields = ('__all__')


class AccountsUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountsUser
        fields = ('__all__')

class ModPrfInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModPrfInfo
        fields = ('__all__')

class ModItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModAct
        fields = ('tot_mod_iem')
