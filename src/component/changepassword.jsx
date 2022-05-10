import axios from "axios";
import React, { useState , useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Info } from '../context/api'
import "../App.css"
const tokenget=()=>{
  let data = localStorage.getItem("token");

  if(data){
    return localStorage.getItem("token")
  }else{
    return null
  }
}

const Changepassword = () => {
  const navigate = useNavigate();
  const [errormsg, seterrormsg] = useState("");
  const [token, setToken] = useState(tokenget())
  // const [otp, setotp] = useState("");
  const [state, setstate] = useState({
    oldPassword:"",
    newPassword:"",
  });
  const url = useContext(Info);
  console.log(url);

  const submiting=(e)=>{
      e.preventDefault();
      
      axios.post(`${url}/change-password`,state,{
        headers:{
          Authorization:token
        }
      }).then(response=>{
        if (response.data.success === true){
          const notify = () => toast('Successfully Change Your Password!', {
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
            navigate("/reset");
          },2700)
          navigate("/");
          seterrormsg(" ");
         
        }else {
          throw new Error(response);
        }
      }).catch((error) => {
           seterrormsg("something wrong please check your old password");
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
        <h1 className="text-center py-4">Change Password</h1>
        <div className="card" style={{ height: "auto" }}>
          <div className="card-body p-5">
            <form action="" onSubmit={submiting}>
              <input
                type="password"
                name="oldPassword"
                className="form-control mb-3"
                value={state.oldPassword}
                placeholder="Enter Your Old Password"
                onChange={check}
                required
              />
              <input
                type="password"
                name="newPassword"
                className="form-control mt-3"
                value={state.newPassword}
                placeholder="Enter Your New Password"
                onChange={check}
                required
              />
              <br />
              <p className="text-danger">{errormsg}</p>
              {/* <p className="text-danger">{token}</p> */}
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

export default Changepassword;