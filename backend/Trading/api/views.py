from rest_framework import status
from rest_framework.response import Response
from .models import *
from .serializers import UserActSerializer, ModActSerializer, ModTrsSerializer, UserPrfSerializer, AccountsUserSerializer, ModPrfInfoSerializer
from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.core import serializers
from django.shortcuts import render, redirect
from django.db.models import Max
from django.http import JsonResponse
import json
import requests
from datetime import datetime
from django.db import connection

#유저 계좌 조회
@api_view(['GET'])
def UserAct(request, user_id):
    try:
        act = get_object_or_404(UsrTrnInfo, usr_id=user_id)
    except UsrTrnInfo.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    

    # Detail Get
    if request.method =='GET':
        serializer = UserActSerializer(act)
        return Response(serializer.data, status=status.HTTP_200_OK)


#유저 수익률 조회
@api_view(['GET'])
def UserPrfAct(request, user_id):
    try:
        act = get_list_or_404(UsrPrfInfo, usr_id=user_id)
    except UsrPrfInfo.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    # Detail Get
    if request.method =='GET':
        serializer = UserPrfSerializer(act, many=True)
        return Response(serializer.data[-6:], status=status.HTTP_200_OK)


#모델 계좌 조회
@api_view(['GET'])
def ModelAct(request, model_id):
    try:
        act = get_object_or_404(ModAct, mod_id=model_id)
    except ModAct.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    

    # Detail Get
    if request.method =='GET':
        serializer = ModActSerializer(act)
        return Response(serializer.data, status=status.HTTP_200_OK)


#모델 거래 내역 리스트
@api_view(['GET', 'POST'])
def TradingList(request, model_pk):
    if request.method =='GET':
        content = get_list_or_404(ModTrs, mod_id=model_pk)
        serializer = ModTrsSerializer(content, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        serializer = ModTrsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#모델 수익률             
@api_view(['GET'])
def ModelPrfAct(request,model_pk):
    try:
        act = get_list_or_404(ModPrfInfo, mod_id=model_pk)
    except ModPrfInfo.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    # Detail Get
    if request.method =='GET':
        serializer = ModPrfInfoSerializer(act, many=True)
        return Response(serializer.data[-6:], status=status.HTTP_200_OK)

# 모델 설명 페이지
@api_view(['GET'])
def ModelInfo(request, model_pk):
    try:
        cursor = connection.cursor()
        query = "select AVG(tot_cus_rtr), count(*), sum(tot_cus_pri) from usr_trn_info group by mod_id"
        result = cursor.execute(query)
        data = cursor.fetchall()

        connection.commit()
        connection.close()

    except:
        connection.rollback()
        print("Failed Selecting")
    
    if model_pk == 1:
        avg = data[0][0]
        user_cnt = data[0][1]
        user_pri = data[0][2]

    elif model_pk == 2:
        avg = data[1][0]
        user_cnt = data[1][1]
        user_pri = data[1][2]

    context = {'user_avg' : avg, 'user_count': user_cnt, 'user_pri': user_pri}

    return JsonResponse(context, json_dumps_params= {'ensure_ascii': False}, safe=False)




#오픈뱅킹 사용자 인증사이트
@api_view(['GET'])
def open_banking_auth(request):
    return redirect('https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id=99b03713-6ca3-45a2-86ea-5a3f6ea29597&redirect_uri=http://localhost:8000/callback&scope=login inquiry transfer&state=12345678901234567890123456789012&auth_type=0')


#입금
@api_view(['GET'])
def trans(request, user_id, model_id):
    if request.method == 'GET':
        #1. 입력id의 유저 이름 가져오기
        sql = "select * from accounts_user where id={}".format(user_id)
        obj = AccountsUser.objects.raw(sql)

        result_list = []

        data_list = serializers.serialize("python", obj)
        for data in data_list:
            #print(data)
            fields =data.get('fields')
            result_list.append(fields["name"])

        name = result_list[0]   #DB에서 해당 아이디 해당하는 유저의 이름 가져옴

        #2. 입력id의 유저 현재 잔액
        sql = "select * from usr_trn_info where usr_id={}".format(user_id)
        obj = UsrTrnInfo.objects.raw(sql)

        result_list = []

        data_list = serializers.serialize("python", obj)
        for data in data_list:
            #print(data)
            fields =data.get('fields')
            result_list.append(fields['tot_cus_pri'])

        recent_usr_amt = result_list[0]  #DB에서 해당 아이디 해당하는 유저의 잔액 가져옴
        #print(type(recent_amt))

        #3. 입력 모델 id의 잔액
        sql = "select * from mod_act where mod_id={}".format(model_id)
        obj = ModAct.objects.raw(sql)

        tot_pri_list = []
        hold_list = []

        data_list = serializers.serialize("python", obj)
        for data in data_list:
            #print(data)
            fields =data.get('fields')
            tot_pri_list.append(fields['tot_mod_pri'])
            hold_list.append(fields['hold_pri'])

        recent_mod_amt = tot_pri_list[0]  #DB에서 해당 아이디 해당하는 모델의 잔액 가져옴
        recent_hold_amt = hold_list[0]

        #4. 계좌 거래내역 조회해서 입금자명, 입금 금액 가져오기
        URL = 'https://testapi.openbanking.or.kr/v2.0/account/transaction_list/fin_num?bank_tran_id=M202300020U111111112&fintech_use_num=120230002088951080465425&inquiry_type=A&inquiry_base=D&from_date=20180101&from_time=000000&to_date=20200101&to_time=000000&sort_order=D&tran_dtime=20230104161500'
        headers = {
                'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTAxMDE4MzI5Iiwic2NvcGUiOlsiaW5xdWlyeSIsImxvZ2luIiwidHJhbnNmZXIiXSwiaXNzIjoiaHR0cHM6Ly93d3cub3BlbmJhbmtpbmcub3Iua3IiLCJleHAiOjE2ODA1ODcyMjUsImp0aSI6ImUzM2MzYmI3LTdiM2YtNGM3NS1hYTVkLWIwZGY1YzUxMzRjMSJ9.T-nSeNGMAa1gy8H_7CX9ym0gML2ODXrAscc6jEZIWNY' }
        response = requests.get(URL, headers=headers) #url 받아오는 변수
        res_data = json.loads(response.text)
        recent_trans = res_data['res_list'][-1]
        #거래내역의 입금자명
        res_name = recent_trans["branch_name"]
        #입금금액
        tran_amt=recent_trans["tran_amt"]
        #print(type(tran_amt))

        #입금 요청 기록 db 업데이트
        prc_dt = datetime.now()
        post_db = TrsCheck( usr_id = user_id, mod_id =model_id,ord_cd =1 ,prc_cd = 0, ren_dt = prc_dt, prc_pri = int(tran_amt))
        post_db.save()

        #5. 거래내역과 해당 유저의 이름이 일치하는지 확인
        if name == res_name:
            result = 'success'
            
            #유저 계좌 원금에 입금금액 update
            post_list = UsrTrnInfo.objects.get(usr_id=user_id)
            post_list.tot_cus_pri = int(tran_amt) + recent_usr_amt
            post_list.save()
            # for post in post_list:
            #     post.tot_cus_pri = int(tran_amt) + recent_usr_amt
            #     post.save()
            
            #모델 계좌원금, hold_pri에 입금금액 update
            post = ModAct.objects.get(mod_id=model_id)
            post.tot_mod_pri = int(tran_amt) + recent_mod_amt
            post.save()
            post.hold_pri = recent_hold_amt - int(tran_amt) 
            post.save()
            
            
            #입금 처리결과 업데이트
            check_obj = TrsCheck.objects.get(pk=post_db.pk)
            check_obj.prc_cd = 1
            check_obj.save()


        else: 
            result = 'fail'

        return Response(result)

#출금
#post형식  -  {"usr_id": 1, "mod_id" : 1, "prc_pri" : 500}

@api_view(['POST'])
def WithDraw(request):
    #0. request에서 값 추출
    user_id = request.data.get('usr_id')
    mod_id = request.data.get('mod_id')    
    prc_pri = request.data.get('prc_pri')

    try:
        #1.입출금 테이블에 출금 기록
        prc_dt = datetime.now()
        post_db = TrsCheck( usr_id = user_id, mod_id =mod_id,ord_cd =2 ,prc_cd = 0, ren_dt = prc_dt, prc_pri = prc_pri)
        post_db.save()

        #2. 입력id의 유저 현재 잔액
        sql = "select * from usr_trn_info where usr_id={}".format(user_id)
        obj = UsrTrnInfo.objects.raw(sql)

        result_list = []

        data_list = serializers.serialize("python", obj)
        for data in data_list:
            #print(data)
            fields =data.get('fields')
            result_list.append(fields['tot_cus_pri'])

        recent_usr_amt = result_list[0]  #DB에서 해당 아이디 해당하는 유저의 잔액 가져옴

        #3. 입력 모델 id의 잔액
        sql = "select * from mod_act where mod_id={}".format(mod_id)
        obj = ModAct.objects.raw(sql)

        tot_pri_list = []
        hold_list = []

        data_list = serializers.serialize("python", obj)
        for data in data_list:
            #print(data)
            fields =data.get('fields')
            tot_pri_list.append(fields['tot_mod_pri'])
            hold_list.append(fields['hold_pri'])

        recent_mod_amt = tot_pri_list[0]  #DB에서 해당 아이디 해당하는 모델의 잔액 가져옴
        recent_hold_amt = hold_list[0]


        #유저 자산내역에 원금 빼기
        post_list = UsrTrnInfo.objects.get(usr_id=user_id)
        post_list.tot_cus_pri = recent_usr_amt - int(prc_pri) 
        post_list.save()
        # for post in post_list:
        #     post.tot_cus_pri = int(tran_amt) + recent_usr_amt
        #     post.save()
        
        #모델 계좌원금, hold_pri에 입금금액 update
        post = ModAct.objects.get(mod_id=mod_id)
        post.tot_mod_pri = recent_mod_amt - int(prc_pri)
        post.save()
        post.hold_pri = recent_hold_amt + int(prc_pri) 
        post.save()

        result = "success"

    except:
        result = 'fail'

    return Response(result)














        




# #계좌 거래내역 조회 코드
# # #tran_id = 0
# @api_view(['GET'])
# def transaction_info(request):
#     #global tran_id
#     #tran_id += 1
#     #URL = 'https://testapi.openbanking.or.kr/v2.0/account/transaction_list/fin_num?bank_tran_id=M202300020U{}&fintech_use_num=120230002088951080465425&inquiry_type=A&inquiry_base=D&from_date=20180101&from_time=000000&to_date=20200101&to_time=000000&sort_order=D&tran_dtime=20230104161500'.format(str(tran_id).zfill(9))
#     URL = 'https://testapi.openbanking.or.kr/v2.0/account/transaction_list/fin_num?bank_tran_id=M202300020U111111125&fintech_use_num=120230002088951080465425&inquiry_type=A&inquiry_base=D&from_date=20180101&from_time=000000&to_date=20200101&to_time=000000&sort_order=D&tran_dtime=20230104161500'
#     headers = {
#                 'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTAxMDE4MzI5Iiwic2NvcGUiOlsiaW5xdWlyeSIsImxvZ2luIiwidHJhbnNmZXIiXSwiaXNzIjoiaHR0cHM6Ly93d3cub3BlbmJhbmtpbmcub3Iua3IiLCJleHAiOjE2ODA1ODcyMjUsImp0aSI6ImUzM2MzYmI3LTdiM2YtNGM3NS1hYTVkLWIwZGY1YzUxMzRjMSJ9.T-nSeNGMAa1gy8H_7CX9ym0gML2ODXrAscc6jEZIWNY' }
#     response = requests.get(URL, headers=headers) #url 받아오는 변수
#     data = json.loads(response.text)
#     #recent_trans = data['res_list'][-1][ "branch_name"]
#     recent_trans = data['res_list'][-1]


#     return JsonResponse(recent_trans,  safe=False, json_dumps_params={'ensure_ascii': False})

#     #결과 값: {"tran_date": "20230105", "tran_time": "010101", "inout_type": "입금", "tran_type": "투자", "print_content": "심혜지", "tran_amt": "1000000", "after_balance_amt": "5000000", "branch_name": "심혜지"}


# @api_view(['GET', 'POST'])
# def user_trans(request):
#     if request.method =='GET':
#         URL = 'http://127.0.0.1:8000/accounts/transaction/'
#         headers = {
#                 'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTAxMDE4MzI5Iiwic2NvcGUiOlsiaW5xdWlyeSIsImxvZ2luIiwidHJhbnNmZXIiXSwiaXNzIjoiaHR0cHM6Ly93d3cub3BlbmJhbmtpbmcub3Iua3IiLCJleHAiOjE2ODA1ODcyMjUsImp0aSI6ImUzM2MzYmI3LTdiM2YtNGM3NS1hYTVkLWIwZGY1YzUxMzRjMSJ9.T-nSeNGMAa1gy8H_7CX9ym0gML2ODXrAscc6jEZIWNY' }
#         res = requests.get(URL, headers=headers)
#         data = json.load(res.text)
#         name = data["branch_name"]
#         print(name)
#         content = get_object_or_404(UsrInfo, cus_nam = name)
#         serializer = ModTrsSerializer(content, many=True)
        
#         return Response(serializer.data, status=status.HTTP_200_OK)

#     elif request.method == 'POST':
#         serializer = ModTrsSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# def transaction_info(request):
#     #global tran_id
#     #tran_id += 1
#     #URL = 'https://testapi.openbanking.or.kr/v2.0/account/transaction_list/fin_num?bank_tran_id=M202300020U{}&fintech_use_num=120230002088951080465425&inquiry_type=A&inquiry_base=D&from_date=20180101&from_time=000000&to_date=20200101&to_time=000000&sort_order=D&tran_dtime=20230104161500'.format(str(tran_id).zfill(9))
#     URL = 'https://testapi.openbanking.or.kr/v2.0/account/transaction_list/fin_num?bank_tran_id=M202300020U111111114&fintech_use_num=120230002088951080465425&inquiry_type=A&inquiry_base=D&from_date=20180101&from_time=000000&to_date=20200101&to_time=000000&sort_order=D&tran_dtime=20230104161500'
#     headers = {
#                 'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTAxMDE4MzI5Iiwic2NvcGUiOlsiaW5xdWlyeSIsImxvZ2luIiwidHJhbnNmZXIiXSwiaXNzIjoiaHR0cHM6Ly93d3cub3BlbmJhbmtpbmcub3Iua3IiLCJleHAiOjE2ODA1ODcyMjUsImp0aSI6ImUzM2MzYmI3LTdiM2YtNGM3NS1hYTVkLWIwZGY1YzUxMzRjMSJ9.T-nSeNGMAa1gy8H_7CX9ym0gML2ODXrAscc6jEZIWNY' }
#     response = requests.get(URL, headers=headers) #url 받아오는 변수
#     # data = json.loads(response.text)
#     # recent_trans = data['api_tran_id']

#     return HttpResponse(response.text)






#------------------------------------------------------------------------------------------------------------

# # 최신 뉴스 리스트 출력
# @api_view(['GET'])
# def RecentNews(request):
#     json_dumps_params = {'ensure_ascii': False}
#     sql = "select * from tb_news where DATE_FORMAT(WritedAt ,'%%Y-%%m-%%d')='2022-11-30' limit 10"
#     #TbNews.objects.filter(SubCategory='').order_by('-writedat')
#     obj = TbNews.objects.raw(sql)
#     result_list = []

#     data_list = serializers.serialize("python", obj)
#     for data in data_list:
#         result_list.append(data.get('fields'))

#     return JsonResponse(result_list, json_dumps_params=json_dumps_params, safe=False)

# # @api_view(['GET'])
# # def Recent(request):

# #     if request.method =='GET':
# #         content = TbNews.objects.order_by('subcategory', 'writedat').distinct('subcategory') 
# #         serializer = NewsSerializer(content,many=True)
# #         return Response(serializer.data, status=status.HTTP_200_OK)


# #전체 리스트 보여주는 뷰(get, post만 사용)
# @api_view(['GET', 'POST'])
# def ContentsList(request):
#     if request.method =='GET':
#         content = get_list_or_404(TbContentrec)[:20]
#         serializer = ContentSerializer(content, many=True)
        
#         return Response(serializer.data, status=status.HTTP_200_OK)

#     elif request.method == 'POST':
#         serializer = ContentSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# #news_pk값 받아서 news_id 값에 해당하는 데이터만 디테일하게 보여주는 뷰 (get, put, delete 사용)
# @api_view(['GET', 'PUT', 'DELETE'])
# def ContentsNewsDetail(request, news_pk):
#     try:
#         content = get_object_or_404(TbContentrec, newsid=news_pk)
#     except TbContentrec.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     # Detail Get
#     if request.method =='GET':
#         serializer = ContentSerializer(content)
#         return Response(serializer.data, status=status.HTTP_200_OK)

#     #update
#     elif request.method =='PUT':
#         serializer = ContentSerializer(content, data=request.data)

#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     #Delete
#     elif request.method == 'DELETE':
#         content.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)


# @api_view(['GET'])
# def ContentsNewsFind(request, news_id):
#     try:
#         news = get_object_or_404(TbNews, id=news_id)
#     except TbContentrec.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
    

#     # Detail Get
#     if request.method =='GET':
#         serializer = NewsSerializer(news)
#         return Response(serializer.data, status=status.HTTP_200_OK)

# @api_view(['GET'])
# def ContentsRecNews(request, recnews_id):
#     if request.method =='GET':
#         rec = TbContentrec.objects.get(newsid=recnews_id)
#         recnews = TbNews.objects.filter(id__in=[rec.r1, rec.r2,rec.r3, rec.r4, rec.r5])

#         serializer = NewsSerializer(recnews, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
