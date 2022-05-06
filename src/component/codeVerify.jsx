import axios from 'axios';
import React,{useState , useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Info } from '../context/api';
// import { Prompt } from 'react-router'
const getData = () => {
      let store = localStorage.getItem("email");
      if(store){
          return localStorage.getItem("email");
      }else{
          return null
      }
}
const CodeVerify = () => {
    const [errormsg, seterrormsg] = useState("");
    const [otp, setotp] = useState("");
    const [storeEmail,setStoreEmail]  = useState(getData());
    const url = useContext(Info);
    
    const [state, setstate] = useState({
        udetail:storeEmail,
        votp:""
    });
    let navigate =useNavigate();

    const submiting = (e)=>{
        e.preventDefault();

      axios.post(`${url}/verifyotp`,state).then(response=>{
        console.log(response)
        if(response.data.success===true)
        {
            const notify = () => toast('Successfully verify Your code!', {
                position: "top-center",
                autoClose:2000,
                hideProgressBar:false,
                closeOnClick:true,
                pauseOnHover:false,
                draggable: true,
                progress: undefined,
                }); 
              notify();
              seterrormsg(" ");
              setTimeout(()=>{
                navigate("/home");
              },2700)
             
              seterrormsg(" ");
        }else{
            throw new Error(response)
        }
    }).catch(error =>  {seterrormsg("something wrong please check your email address or code"); setotp(" ")});

    }
   const check=(e)=>{

    setstate((prev)=>{
        return{
            ...prev,
            [e.target.name]:e.target.value
        }
    })
}

const resend=()=>{
    
         axios.put(`${url}/resend-otp/`,{
        udetail:state.udetail,
      }).then(response=>{
        console.log(response)
        if(response.data.success===true)
        {
            setotp(response.data.message);
            seterrormsg(" ");
        }else{
            throw new Error(response)
        }
    }).catch(error =>  {setotp("Error Occur Please check your email"); seterrormsg(" ")});


   }

   const codecheck=(e)=>{
        // console.log(e.target.value);
        if(e.target.value.length > 6){
            seterrormsg("your code is is invalid")
        } else{
            seterrormsg(" ")
        }
   }

    


  return (
    <>
        <div className="container d-flex justify-content-center align-items-center min-vh-100 flex-column">
            <h1 className="text-center py-4">Number Verify</h1>
            <p><span className="text-danger">Note: </span>The otp will expire in 5 minutes and only be used once</p>
            <div className="card" style={{width:"40%" , height:"auto" }}>
                    <div className="card-body p-5">
                         <form action="" onSubmit={submiting}>
                         {/* <input type="email" name='udetail' className="form-control" value={state.udetail} placeholder="Enter Your email"  onChange={check} required /><br /> */}
                         <input type="number" name='votp' maxLength={6} className="form-control" value={state.votp} style={{letterSpacing:"20px"}} placeholder="Enter Your Otp"  onInput={codecheck} onChange={check} required /><br />
                         <p className="text-danger">{errormsg}</p>
                         <p className='text-danger'>{otp}</p>
                         <button className="btn btn-primary px-5" type="submit">Verify</button>
                         <button className="btn btn-primary px-3 mx-3" type="button" onClick={resend}>Resend Code</button>
                         <ToastContainer />
                         </form>
                    </div>
              </div>
        </div>
    </>
  )
}

export default CodeVerify