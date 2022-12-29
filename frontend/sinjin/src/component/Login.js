export default function Login(){
    return(
    <div>
        <div style={{textAlign: '-webkit-center'}}>
        <div className="form-group">
            <h1>로그인</h1>
            <input style={{width: '350px',margin: '20px'}} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="아이디" />
        </div>

        <div className="form-group">
          <input style={{width: '350px',margin: '20px'}} type="password" className="form-control" id="exampleInputPassword1" placeholder="비밀번호" />
        </div>

        <div className="login-button">
            <button type="login" className="btn btn-primary" style={{width: '350px',margin: '20px'}}>로그인</button>
            </div>
        </div>
        
    </div>
    )
  }