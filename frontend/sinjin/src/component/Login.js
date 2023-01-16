import axios from "axios"
import { useState } from "react";


// redux recoil react query
export default function Login(){
        const[inputs, setInputs] = useState({
            username:"",
            password:""
        });
        
        const handleChange = (e) =>{
            setInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
        };

        const handleClick = async (e) =>{
            e.preventDefault();

            try{
                await axios.post('http://3.35.49.211/accounts/api/token/',inputs)
                .then(res => {
                          localStorage.setItem('jwt', res.data.access)
                          localStorage.setItem('jwt-refresh', res.data.refresh)
                          alert('로그인 성공!')
                          document.location.href = '/'
                         })

            }catch(err){
                alert(err.request.responseText)
            };
        };
    return(

    <div>
        <div style={{textAlign: '-webkit-center'}}>
        <div className="form-group">
            <h1>로그인</h1>
            <input style={{width: '350px',margin: '20px'}} onChange={handleChange} name='username' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="아이디" />
        </div>

        <div className="form-group">
          <input style={{width: '350px',margin: '20px'}} onChange={handleChange} name='password' type="password" className="form-control" id="exampleInputPassword1" placeholder="비밀번호" />
        </div>
        <div className="login-button">
            <button type="login" className="btn btn-primary" onClick={handleClick} style={{width: '350px',margin: '20px'}}>로그인</button>
            </div>
        </div>
        
    </div>
    )
  }