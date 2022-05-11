import axios from "axios";
import React, { useState ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Info } from '../context/api'
import "../App.css"
const Login = () => {
  let navigate = useNavigate();
  const [errormsg, seterrormsg] = useState("");
  const [state, setstate] = useState({
    username: "",
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
      .post(`${url}api/auth/login`, state)
      .then((response) => {
        console.log(response);
        if (response.status ===200) {
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
            navigate("/user");
          },2700)
          localStorage.setItem("logintoken", response.data.token);
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
          <div className="card" style={{  height: "auto" }}>
            <div className="card-body p-5">
              <form action="" onSubmit={submiting}>
                <input
                  type="email"
                  name="username"
                  className="form-control"
                  value={state.username}
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
                <button className="btn btn-primary px-3 me-3" type="submit">
                  Login
                </button>
               <button className="btn btn-primary px-3 mx-3" type="submit"  onClick={()=>navigate("/register")}>
                  Sign Up
                </button>
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
