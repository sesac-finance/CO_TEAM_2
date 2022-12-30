from rest_framework import permissions, status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import authentication_classes, permission_classes

#회원가입시 비밀번호 두번 입력해서 확인
@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    password = request.data.get('password')
    print(request.data)
    password_confirmation = request.data.get('passwordConfirmation')
    # print(password_confirmation)

    if password != password_confirmation:
        return Response({'error': '비밀번호가 일치하지 않습니다!'}, status=status.HTTP_400_BAD_REQUEST)

    serializer = UserSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        user = serializer.save()
        user.set_password(password)
        user.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)




@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_bank(request):
    context = {
        'bank': request.user.bank,
        'id': request.user.pk
    }
    return Response(context, status=status.HTTP_200_OK)




# @api_view(['GET'])
# def current_user(request):

#     serializer = UserSerializer(request.user)
#     return Response(serializer.data)


# class UserList(APIView):

#     permission_classes = (permissions.AllowAny,)

#     def post(self, request, format=None):
#         serializer = UserSerializerWithToken(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)






# def login_view(request):
#     if request.method == "POST":
#         # request의 username값을 username에 저장 (여기서 아이디 입력 값 확인)
#         username = request.POST["username"]
#         password = request.POST["password"]
#         # 입력한 username과 password 값을 user 변수에 넣어줌
#         user = authenticate(username=username, password=password)
#         if user is not None:
#             print("인증성공")
#             login(request, user)
#         else:
#             print("인증실패")


#     return render(request, "accounts/login.html")

# def logout_view(request):
#     logout(request)
#     #logout이 끝나면 다시 로그인 화면으로 돌려준다 (로그아웃 후 보여줄 화면 설정)
#     return redirect("accounts:login")

# def signup_view(request):

#     if request.method == "POST":
#         print(request.POST)
#         cusname = request.POST["cusname"]
#         userid = request.POST["userid"]
#         password = request.POST["password"]       
#         useraccount = request.POST["useraccount"]
#         email = request.POST['email']

#         # 유저 정보 저장
#         user = User.objects.create_user(userid, email, password)
#         user.cusname = cusname
#         user.useraccount = useraccount
#         user.save()
#         # 회원가입 성공시 다시 로그인창으로 되돌아가기
#         return redirect("accounts:login")

#     return render(request, "accounts/signup.html")


