import axios from "axios";
import React, { useState ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Info } from '../context/api'

const Login = () => {
  let navigate = useNavigate();
  const [errormsg, seterrormsg] = useState("");
  const [state, setstate] = useState({
    udetail: "",
    password: "",
  });
  const url = useContext(Info);
  const check = (e) => {
    let { name, value } = e.target;

    setstate((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const submiting =  (e) => {
   
    e.preventDefault();
       axios
      .post(`${url}/login`, state)
      .then((response) => {
        console.log(response);
        if (response.data.success === true) {
          const notify = () => toast('Successfully Login!', {
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
          localStorage.setItem("token", response.data.token);
        } else {
          throw new Error(response);
        }
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
          seterrormsg("something wrong please check email address or password");
      });
  };
  return (
    <>
      <div>
        <div className="container d-flex justify-content-center align-items-center min-vh-100 flex-column">
          <h1 className="text-center py-4">Login Page</h1>
          <div className="card" style={{ width: "40%", height: "auto" }}>
            <div className="card-body p-5">
              <form action="" onSubmit={submiting}>
                <input
                  type="email"
                  name="udetail"
                  className="form-control"
                  value={state.udetail}
                  placeholder="Enter Your Email Address"
                  onChange={check}
                  required
                />{" "}
                <br />
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={state.password}
                  placeholder="Enter Your Password"
                  onChange={check}
                  required
                />{" "}
                <br />
                <Link to="/forget">Forget-password?</Link>
                <p className="text-danger">{errormsg}</p>
                <button className="btn btn-primary px-5 me-3" type="submit">
                  Login
                </button>
               <Link to="/register"> <button className="btn btn-primary px-5 mx-5" type="submit">
                  Sign Up
                </button></Link>
                <ToastContainer />
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;