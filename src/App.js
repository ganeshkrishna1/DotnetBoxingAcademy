import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup"
import "./components/Signup/Signup.css"
import './components/Login/Login.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Adminacademy from "./components/Admin/Adminacademy";
import Viewacademy from "./components/Customer/Viewacademy";
import Addacademy from "./components/Admin/addAcademy";
import Editacademy from "./components/Admin/Editacademy";
import Admincourse from "./components/Admin/Admincourse";
import Addcourse from "./components/Admin/Addcourse";
import Editcourse from "./components/Admin/Editcourse";
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
          <Route path='/admincourse' element={<Admincourse />}></Route>
          <Route path='/addcourse' element={<Addcourse />}></Route>
          <Route path='/editacademy/:id' element={<Editacademy />}></Route>
          <Route path='/editcourse/:id' element={<Editcourse />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
