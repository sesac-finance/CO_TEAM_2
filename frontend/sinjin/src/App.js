import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './component/Navbar';
import Endbar from './component/Endbar';
import Login from './component/Login';
import Mypg from './component/Mypg';
import Servicepg from './component/Service';
import Mlpg from './component/Mlpg';
import Dlpg from './component/Dlpg';
import Mainpg from './component/Mainpg';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import axios from 'axios';


function App() {
  const connection_test = () => {
    axios.get('http://localhost:8000/api/useract/3').then((res)=>{
      console.log(res.data)
    })
  }
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Mainpg />}/>
          <Route path='login' element={<Login />} />
          <Route path='model/ml' element={<Mlpg /> }/>
          <Route path='model/dl' element={<Dlpg /> }/>
          <Route path='mypg' element={<Mypg /> }/>
          <Route path='service' element={<Servicepg />}/>
        </Routes>
        <Endbar />
      </div>
      <button onClick={()=>{connection_test()}}>서버통신테스트</button>
    </BrowserRouter>
  );
}


export default App;
