from django.urls import path
from . import views

urlpatterns = [
    path('useract/<int:user_id>', views.UserAct ),  # 유저 계좌 연결
    path('modelact/<int:model_id>', views.ModelAct),  #모델 계좌 연결
    path('modeltrs/<int:model_pk>', views.TradingList), #모델 거래 내역 리스트

]