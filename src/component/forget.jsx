import axios from 'axios';
import React,{useState , useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Info } from '../context/api'
import "../App.css"
const Forget = () => {
    // all Hooks
    const [errormsg, seterrormsg] = useState("");
    const [otp, setotp] = useState("");
    const url = useContext(Info);
    const [state, setstate] = useState({
        udetail:""
    });
    let navigate =useNavigate();

  // all function

    const submiting = async (e)=>{
        e.preventDefault();
        
    await axios.put(`${url}/forget-pwd/`,state).then(response=>{
        console.log(response)
        if(response.data.success===true)
        {
              navigate("/forgotcode");
              seterrormsg(" ");
              localStorage.setItem("forgotall",JSON.stringify({...state}));
        }else{
            throw new Error(response)
        }
    }).catch(error =>  {seterrormsg("something wrong please check your email address"); setotp(" ")});

    }

    const check=(e)=>{
        setstate((prev)=>{
            return{
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }
  return (
    <>
        <div className="container d-flex justify-content-center align-items-center min-vh-100 flex-column">
            <h1 className="text-center py-4">Forget Password</h1>
            {/* <p><span className="text-danger">Note: </span>The otp will expire in 5 minutes and only be used once</p> */}
            <div className="card" style={{height:"auto" }}>
                    <div className="card-body p-5">
                         <form action="" onSubmit={submiting}>
                         <input type="email" name='udetail' className="form-control" value={state.udetail} placeholder="Enter Your Email"  onChange={check} required /><br />
                         <p className="text-danger">{errormsg}</p>
                         {/* <p className='text-danger'>{otp}</p> */}
                         <button className="btn btn-primary px-5" type="submit">Next</button>
                         {/* <button className="btn btn-primary px-3 mx-3" type="button" onClick={resend}>Resend Code</button> */}
                         </form>
                    </div>
              </div>
        </div>
    </>
  )
}

export default Forget