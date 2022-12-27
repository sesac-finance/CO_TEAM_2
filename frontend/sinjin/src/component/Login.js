export default function Login(){
    return(
    <form>
        <div style={{textAlign: '-webkit-center'}}>
        <div class="form-group">
            <h1>로그인</h1>
            <input style={{width: '350px',margin: '20px'}} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="아이디" />
        </div>

        <div class="form-group">
          <input style={{width: '350px',margin: '20px'}} type="password" class="form-control" id="exampleInputPassword1" placeholder="비밀번호" />
        </div>

        <div class="login-button">
            <button type="login" class="btn btn-primary" style={{width: '350px',margin: '20px'}}>로그인</button>
            </div>
        </div>
        
    </form>
    )
  }