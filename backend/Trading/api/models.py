from django.db import models

class AccountEmailaddress(models.Model):
    email = models.CharField(unique=True, max_length=254)
    verified = models.IntegerField()
    primary = models.IntegerField()
    user = models.ForeignKey('AccountsUser', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'account_emailaddress'


class AccountEmailconfirmation(models.Model):
    created = models.DateTimeField()
    sent = models.DateTimeField(blank=True, null=True)
    key = models.CharField(unique=True, max_length=64)
    email_address = models.ForeignKey(AccountEmailaddress, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'account_emailconfirmation'


class AccountsUser(models.Model):
    id = models.BigAutoField(primary_key=True)
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()
    bank = models.CharField(max_length=32, blank=True, null=True)
    name = models.CharField(max_length=32, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'accounts_user'


class AccountsUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AccountsUser, models.DO_NOTHING)
    group = models.ForeignKey('AuthGroup', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'accounts_user_groups'
        unique_together = (('user', 'group'),)


class AccountsUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AccountsUser, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'accounts_user_user_permissions'
        unique_together = (('user', 'permission'),)


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthtokenToken(models.Model):
    key = models.CharField(primary_key=True, max_length=40)
    created = models.DateTimeField()
    user = models.OneToOneField(AccountsUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'authtoken_token'


class CapAct(models.Model):
    mod_id2 = models.ForeignKey('ModInfo', models.DO_NOTHING, db_column='mod_id2')
    cap_act = models.CharField(max_length=100)
    ren_dt = models.DateTimeField()
    act_bal = models.BigIntegerField()
    wdr_pri = models.BigIntegerField(blank=True, null=True)
    dps_pri = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cap_act'


class CompanyInfo(models.Model):
    code = models.CharField(primary_key=True, max_length=100)
    company = models.CharField(max_length=100)
    last_update = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'company_info'


class DailyPrice(models.Model):
    code = models.CharField(primary_key=True, max_length=20)
    date = models.DateField()
    open = models.BigIntegerField(blank=True, null=True)
    high = models.BigIntegerField(blank=True, null=True)
    low = models.BigIntegerField(blank=True, null=True)
    close = models.BigIntegerField(blank=True, null=True)
    diff = models.BigIntegerField(blank=True, null=True)
    volume = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'daily_price'
        unique_together = (('code', 'date'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AccountsUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class DjangoSite(models.Model):
    domain = models.CharField(unique=True, max_length=100)
    name = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'django_site'


class KnoxAuthtoken(models.Model):
    digest = models.CharField(primary_key=True, max_length=128)
    created = models.DateTimeField()
    user = models.ForeignKey(AccountsUser, models.DO_NOTHING)
    expiry = models.DateTimeField(blank=True, null=True)
    token_key = models.CharField(max_length=8)

    class Meta:
        managed = False
        db_table = 'knox_authtoken'


class ModAct(models.Model):
    mod = models.ForeignKey('ModInfo', models.DO_NOTHING)
    mod_ren_dt = models.DateTimeField()
    tot_mod_pri = models.BigIntegerField()
    tot_mod_prf = models.BigIntegerField()
    tot_mod_inv = models.BigIntegerField()
    tot_mod_rtr = models.FloatField()
    tot_mod_iem_cd = models.CharField(max_length=100)
    tot_mod_mon_rtr = models.FloatField()
    tot_mod_iem_rtr = models.FloatField()
    tot_mod_iem_per_rtr = models.CharField(max_length=100, blank=True, null=True)
    tot_mod_iem_qty = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mod_act'


class ModInfo(models.Model):
    mod_id = models.IntegerField(primary_key=True)
    mod_act = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'mod_info'


class ModSign(models.Model):
    mod = models.ForeignKey(ModInfo, models.DO_NOTHING)
    ord_sig = models.IntegerField()
    ord_sig_dt = models.DateTimeField()
    iem_cd = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'mod_sign'


class ModTrs(models.Model):
    mod = models.ForeignKey(ModInfo, models.DO_NOTHING)
    ord_dt = models.DateTimeField()
    iem_cd = models.IntegerField()
    sby_dit_cd = models.IntegerField()
    cns_qty = models.IntegerField()
    orr_pr = models.BigIntegerField()

    class Meta:
        managed = False
        db_table = 'mod_trs'


class RtDiv(models.Model):
    usr = models.ForeignKey(AccountsUser, models.DO_NOTHING)
    mod = models.ForeignKey(ModInfo, models.DO_NOTHING)
    usr_rtr = models.FloatField()
    ren_dt = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'rt_div'


class TrsCheck(models.Model):
    usr = models.ForeignKey(AccountsUser, models.DO_NOTHING)
    btn_clk_cd = models.IntegerField()
    btn_clk_dt = models.DateTimeField()
    usr_ord_cd = models.IntegerField()
    usr_ord_dt = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'trs_check'


class UsrOrdInfo(models.Model):
    usr = models.ForeignKey(AccountsUser, models.DO_NOTHING)
    ord_cd = models.IntegerField()
    ord_amt = models.BigIntegerField()
    ord_dt = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'usr_ord_info'


class UsrPrfInfo(models.Model):
    usr = models.ForeignKey(AccountsUser, models.DO_NOTHING)
    ren_dt = models.DateTimeField()
    tot_cus_rtr = models.FloatField()

    class Meta:
        managed = False
        db_table = 'usr_prf_info'


class UsrTrnInfo(models.Model):
    usr = models.ForeignKey(AccountsUser, models.DO_NOTHING)
    ren_dt = models.DateTimeField()
    tot_cus_pri = models.BigIntegerField()
    tot_cus_prf = models.BigIntegerField()
    tot_cus_inv = models.BigIntegerField()
    tot_cus_rtr = models.FloatField()

    class Meta:
        managed = False
        db_table = 'usr_trn_info'