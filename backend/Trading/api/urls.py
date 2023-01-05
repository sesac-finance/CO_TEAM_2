from django.urls import path
from . import views

urlpatterns = [
    path('useract/<int:user_id>', views.UserAct ),  # 유저 계좌 연결
    path('userprf/<int:user_id>', views.UserPrfAct ),  # 유저 수익률 연결
    path('modelact/<int:model_id>', views.ModelAct),  #모델 계좌 연결
    path('modeltrs/<int:model_pk>', views.TradingList), #모델 거래 내역 리스트
    path('openbank/', views.open_banking_auth), #오픈뱅킹
    path('transaction/<int:user_id>/<int:model_id>', views.trans),
    #path('usertrans/', views.user_trans),

]