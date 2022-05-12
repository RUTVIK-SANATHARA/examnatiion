import './App.css';
import Login from './component/Login';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Home from './component/Home';
import Register from './component/register';
// import CodeVerify from './component/codeVerify';
import Forget from './component/forget';
// import Changepassword from './component/changepassword';
import Forcode from './component/Forcode';
import Reset from './component/reset';
import Api from './context/api';
// import Welcome from './component/welcome';
import Exam from  "./pages/Exam";
import Admin from "./pages/Admin";
import User from './pages/User';
import Addnew from './pages/Addnew';
import { LocalStoragedata } from './component/local';
import Local from './component/local';
function App() {

  return (
    <>
     <Api>
     <BrowserRouter>
       <Local>
       <Routes>
         <Route path='/home' element={<Home/>}></Route>
         <Route path='/user' element={<User/>}></Route>
         <Route path='/admin' element={<Admin/>}></Route>
         <Route path='/addque' element={<Addnew/>}></Route>
         <Route path='/' element={<Login/>}></Route>
         <Route path='/exam' element={<Exam/>}></Route>
         {/* <Route path='/welcome' element={<Welcome/>}></Route> */}
         <Route path='/register' element={<Register/>}></Route>
         <Route path='/forget' element={<Forget/>}></Route>
         <Route path='/reset' element={<Reset/>}></Route>
         <Route path='/forgotcode' element={<Forcode/>}></Route>
         {/* <Route path='/codeVerify' element={<CodeVerify/>}></Route> */}
         {/* <Route path='/change' element={<Changepassword/>}></Route> */}
       </Routes>
       </Local>
     </BrowserRouter>
      </Api>
    </>
  );
}

export default App;
