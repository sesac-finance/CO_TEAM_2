from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name = "accounts"

urlpatterns = [
    path('signup/', views.signup), #회원가입
    path('user/', views.get_user),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), #로그인- 토큰발행
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), #토큰 재 발행


]

