from django.urls import path
from . import views

app_name = "accounts"

urlpatterns = [

    path('', views.UserList.as_view()),
    path('current/',  views.current_user),

]

    # path('login/', views.login_view, name="login"),  # 로그인
    # path('logout', views.logout_view, name="logout"),  # 로그아웃
    # path('signup', views.signup_view, name="signup"),  # 회원가입   
