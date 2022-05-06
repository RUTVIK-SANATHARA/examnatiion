import './App.css';
import Login from './component/Login';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Home from './component/Home';
import Register from './component/register';
import CodeVerify from './component/codeVerify';
import Forget from './component/forget';
import Changepassword from './component/changepassword';
import Forcode from './component/Forcode';
import Reset from './component/reset';
import Api from './context/api';

function App() {

  return (
    <>
     <Api>
     <BrowserRouter>
       <Routes>
         <Route path='/home' element={<Home/>}></Route>
         <Route path='/' element={<Login/>}></Route>
         <Route path='/register' element={<Register/>}></Route>
         <Route path='/forget' element={<Forget/>}></Route>
         <Route path='/reset' element={<Reset/>}></Route>
         <Route path='/forgotcode' element={<Forcode/>}></Route>
         <Route path='/codeVerify' element={<CodeVerify/>}></Route>
         <Route path='/change' element={<Changepassword/>}></Route>
       </Routes>
     </BrowserRouter>
      </Api>
    </>
  );
}

export default App;
