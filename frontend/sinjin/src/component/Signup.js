import axios from "axios";
import { useState } from "react"
import {useNavigate} from 'react-router-dom'


export default function Signup(){
    const navigate = useNavigate()
        const[inputs, setInputs] = useState({
            username:"",
            bank:"",
            password:"",
            passwordConfirmation:"",
            name:""
        });
    const [err, setErr] = useState(null);
    
    const handleChange = (e) =>{
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async (e) =>{
        e.preventDefault();

        try{
            await axios.post('http://localhost:4000/accounts/signup/',inputs)
            .then(res =>{
                alert('회원가입 성공!!')
                navigate('/login')
            })

        }catch(err){
            alert(err.request.responseText)
            // setErr(err.request.responseText);
        };
    };

    return(
    <div>
        <div style={{textAlign: '-webkit-center'}}>
        <div className="form-group">
            <h1>회원가입</h1>
            <div className="form-group">
            <input style={{width: '350px',margin: '20px'}} type="name" className="form-control" name="name" onChange={handleChange} id="exampleInputName" placeholder="이름" />
            </div>
            <input style={{width: '350px',margin: '20px'}} type="email" className="form-control" name="username" onChange={handleChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="아이디" />
        </div>

        <div className="form-group">
          <input style={{width: '350px',margin: '20px'}} type="password" className="form-control" name="password" onChange={handleChange}  id="exampleInputPassword1" placeholder="비밀번호" />
        </div>
        <div className="form-group">
          <input style={{width: '350px',margin: '20px'}} type="password" className="form-control" name="passwordConfirmation" onChange={handleChange} id="exampleInputPassword2" placeholder="비밀번호 확인" />
        </div>
        <div className="form-group">
          <input style={{width: '350px',margin: '20px'}} type="account" className="form-control" name="bank" onChange={handleChange} id="exampleInputAccount" placeholder="계좌번호" />
        </div>
        {/* {err && err} */}
        <div className="login-button">
            <button type="login" onClick={handleClick} className="btn btn-primary" style={{width: '350px',margin: '20px'}}>회원가입</button>
            </div>
        </div>
        
    </div>
    )
  }