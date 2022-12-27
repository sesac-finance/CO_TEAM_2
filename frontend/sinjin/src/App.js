import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './component/Navbar';
import Endbar from './component/Endbar';
import Login from './component/Login';
import Mainpg from './component/Mainpg';
import { BrowserRouter , Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Mainpg />}/>
          <Route path='/login' element={<Login />} />
        </Routes>
        <Endbar />
      </div>
    </BrowserRouter>
  );
}


export default App;
