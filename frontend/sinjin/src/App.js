import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './component/Navbar';
import Endbar from './component/Endbar';
import Login from './component/Login';
import Servicepg from './component/Service';
import Mlpg from './component/Mlpg/Mlpg';
import Dlpg from './component/Dlpg/Dlpg';
import Mainpg from './component/Mainpg';
import Signup from './component/Signup';
import Mypg from './component/Mypg/Mypg';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import { useState , useEffect} from 'react';





function App() {
  const [isLogin, setIsLogin] = useState(false);
 
  useEffect(() => {
    if(localStorage.getItem('jwt') === null){
    // localStorage 에 jwt 라는 key 값으로 저장된 값이 없다
      setIsLogin(false)
    } else {
    // localStorage 에 jwt 라는 key 값으로 저장된 값이 있다면
    // 로그인 상태 변경
      setIsLogin(true)
    }
  },[])
  return (
    <BrowserRouter>
      <div>
      {isLogin===true ? 
        // Main 컴포넌트 호출 시 isLogin 이라는 props 값을 전달
        (<Navbar isLogin={isLogin} />):(<Navbar isLogin={isLogin}/>)}
        <div className='container'>
          <Routes>
            <Route exact path='/' element={<Mainpg  />}/>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
            <Route path='model/ml' element={<Mlpg /> }/>
            <Route path='model/dl' element={<Dlpg /> }/>
            <Route path='mypg' element={<Mypg /> }/>
            <Route path='service' element={<Servicepg />}/>
          </Routes>
        </div>
        <Endbar />
      </div>
    </BrowserRouter>
    );
}


export default App;
