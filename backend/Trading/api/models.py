from django.db import models

class CapAct(models.Model):
    id = models.IntegerField(primary_key=True)
    mod_id2 = models.ForeignKey('ModInfo', models.DO_NOTHING, db_column='mod_id2')
    cap_act = models.IntegerField()
    ren_dt = models.DateTimeField()
    act_bal = models.IntegerField()
    wdr_pri = models.IntegerField(blank=True, null=True)
    dps_pri = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cap_act'


class CompanyInfo(models.Model):
    code = models.IntegerField(primary_key=True)
    company = models.CharField(max_length=100)
    last_update = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'company_info'


class DailyPrice(models.Model):
    key = models.IntegerField(db_column='Key', primary_key=True)  # Field name made lowercase.
    code = models.ForeignKey(CompanyInfo, models.DO_NOTHING, db_column='code')
    field = models.DateTimeField(db_column='Field')  # Field name made lowercase.
    open = models.IntegerField()
    high = models.IntegerField()
    low = models.IntegerField()
    close = models.IntegerField()
    diff = models.IntegerField()
    volume = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'daily_price'


class ModAct(models.Model):
    id = models.IntegerField(primary_key=True)
    mod = models.ForeignKey('ModInfo', models.DO_NOTHING)
    mod_ren_dt = models.DateTimeField()
    tot_mod_pri = models.IntegerField()
    tot_mod_prf = models.IntegerField()
    tot_mod_inv = models.IntegerField()
    tot_mod_rtr = models.FloatField()
    tot_mod_iem_cd = models.IntegerField()
    tot_mod_mon_rtr = models.FloatField()
    tot_mod_iem_rtr = models.FloatField()
    tot_mod_iem_per_rtr = models.CharField(max_length=100, blank=True, null=True)
    tot_mod_iem_qty = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mod_act'


class ModInfo(models.Model):
    mod_id = models.IntegerField(primary_key=True)
    mod_act = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'mod_info'


class ModSign(models.Model):
    id = models.IntegerField(primary_key=True)
    mod = models.ForeignKey(ModInfo, models.DO_NOTHING)
    ord_sig = models.IntegerField()
    ord_sig_dt = models.DateTimeField()
    iem_cd = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'mod_sign'


class ModTrs(models.Model):
    id = models.IntegerField(primary_key=True)
    mod = models.ForeignKey(ModInfo, models.DO_NOTHING)
    ord_dt = models.DateTimeField()
    iem_cd = models.IntegerField()
    sby_dit_cd = models.IntegerField()
    cns_qty = models.IntegerField()
    orr_pr = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'mod_trs'


class RtDiv(models.Model):
    id = models.IntegerField(primary_key=True)
    usr = models.ForeignKey('UsrInfo', models.DO_NOTHING)
    mod = models.ForeignKey(ModInfo, models.DO_NOTHING)
    usr_rtr = models.FloatField()
    ren_dt = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'rt_div'


class TrsCheck(models.Model):
    id = models.IntegerField(primary_key=True)
    usr = models.ForeignKey('UsrInfo', models.DO_NOTHING)
    btn_clk_cd = models.IntegerField()
    btn_clk_dt = models.DateTimeField()
    usr_ord_cd = models.IntegerField()
    usr_ord_dt = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'trs_check'


class UsrInfo(models.Model):
    id = models.IntegerField(primary_key=True)
    pas_wd = models.CharField(max_length=32)
    cus_nam = models.TextField()
    mypg_cd = models.IntegerField()
    cus_id = models.CharField(max_length=32)
    usr_act = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'usr_info'


class UsrOrdInfo(models.Model):
    id = models.IntegerField(primary_key=True)
    usr = models.ForeignKey(UsrInfo, models.DO_NOTHING)
    ord_cd = models.IntegerField()
    ord_amt = models.IntegerField()
    ord_dt = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'usr_ord_info'


class UsrPrfInfo(models.Model):
    id = models.IntegerField(primary_key=True)
    usr = models.ForeignKey(UsrInfo, models.DO_NOTHING)
    ren_dt = models.DateTimeField()
    tot_cus_rtr = models.FloatField()

    class Meta:
        managed = False
        db_table = 'usr_prf_info'


class UsrTrnInfo(models.Model):
    id = models.IntegerField(primary_key=True)
    usr = models.ForeignKey(UsrInfo, models.DO_NOTHING)
    ren_dt = models.DateTimeField()
    tot_cus_pri = models.IntegerField()
    tot_cus_prf = models.IntegerField()
    tot_cus_inv = models.IntegerField()
    tot_cus_rtr = models.FloatField()

    class Meta:
        managed = False
        db_table = 'usr_trn_info'