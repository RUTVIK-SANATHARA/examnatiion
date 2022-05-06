import axios from "axios";
import React, { useState , useContext} from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Info } from '../context/api'

const allData = () => {

    let store = localStorage.getItem("forgotall");
    
    if (store) {
      return JSON.parse(localStorage.getItem("forgotall")) 
    } else {
      return null;
    }
  };

const Reset = () => {
  const url = useContext(Info);
  const navigate = useNavigate();
  const [errormsg, seterrormsg] = useState("");
  const [storeAll, setStoreAll] = useState(allData());
  const [state, setstate] = useState({
    udetail:storeAll.udetail,
    otp:storeAll.votp,
    newPwd:"",
  });

  const submiting=(e)=>{
      e.preventDefault();
      
      axios.put(`${url}/reset-pwd/`,state).then(response=>{
        if (response.data.success === true){
            const notify = () => toast('Successfully Reset Your Password !', {
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
                navigate("/");
              },2700)
          
          seterrormsg(" ");
        }else {
          throw new Error(response);
        }
      }).catch((error) => {
           seterrormsg("something wrong please check your email address");
      });
     
  }

  const check = (e) => {
    setstate((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };


  return (
    <>
           <div className="container d-flex justify-content-center align-items-center min-vh-100 flex-column">
        <h1 className="text-center py-4">Create Password</h1>
        <div className="card" style={{ width: "40%", height: "auto" }}>
          <div className="card-body p-5">
            <form action="" onSubmit={submiting}>
              <input
                type="password"
                name="newPwd"
                className="form-control mb-3"
                value={state.newPwd}
                placeholder="Enter Your New Password"
                onChange={check}
                required
              />
              <br />
              <p className="text-danger">{errormsg}</p>
              <button className="btn btn-primary px-5" type="submit">
                  Done
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Reset;