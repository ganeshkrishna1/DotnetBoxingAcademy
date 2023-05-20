import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup"
import "./components/Signup/Signup.css"
import './components/Login/Login.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Adminacademy from "./components/Admin/Adminacademy";
import Viewacademy from "./components/Customer/Viewacademy";
import Addacademy from "./components/Admin/addAcademy";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/academy' element={<Adminacademy />}></Route>
          <Route path='/viewacademy' element={<Viewacademy />}></Route>
          <Route path='/addacademy' element={<Addacademy />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
