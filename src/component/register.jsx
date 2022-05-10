import axios from 'axios';
import React,{useState , useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../compo.css";
import "../App.css"
import { Info } from '../context/api'
const Register = () => {
     let navigate =useNavigate();
     const [val, setValue] = useState("")
    const [errormsg, seterrormsg] = useState("")
    const url = useContext(Info);
    const [state, setstate] = useState({
        name:"",
        email:"",
        confirm:"",
        password:"",
        phone:""
    })
    const check=(e)=>{
        // let {name , value}= e.target;

        setstate((prev)=>{
            return{
                ...prev,
                [e.target.name]:e.target.value,
                phone:val
            }
        })
    }

    const num =(e)=>{
        let number=e.target.value.replace(/ /g, '');
        console.log(number);
        if(number.length > 13){
            seterrormsg("your phone number is invalid");
        }else if(number.length < 13){
            seterrormsg("your phone number is invalid");
        }else{
            seterrormsg(" ");
        }
      
    }

    const submiting = async (e)=>{
        e.preventDefault();
            await axios.post(`${url}/register`,state).then(response=>{
        console.log(response)
       
        if(response.data.success===true)
        {
            const notify = () => toast('Successfully register Your Data!', {
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
                navigate("/codeVerify");
              },2700)
            seterrormsg(" ");
            localStorage.setItem("email",state.email);
        }else{
            throw new Error(response)
        }
    })
    .catch(error =>  { seterrormsg("Something Wrong please check Phone number or Email address");});
   }
//    const submiting= async(e)=>{
//        e.preventDefault();
//       let info= await axios.post("https://vaistrainfo.herokuapp.com/auth/register",state);
//       let org= await info.data;
//       console.log(org);
//    }
  return (
    <>
        <div>
           <div className="container d-flex justify-content-center align-items-center min-vh-100 flex-column">
            <h1 className="text-center py-4">Sign Up</h1>
            <div className="card" style={{ height:"auto" }}>
                    <div className="card-body p-5">
                         <form action="" onSubmit={submiting}>
                         <input type="text" name='name'  className="form-control" value={state.name} placeholder="Enter Your Name"  onChange={check} required/>  <br />
                         <input type="email" name='email'  className="form-control" value={state.email} placeholder="Enter Your Email"  onChange={check} required/>  <br />
                         <PhoneInput international defaultCountry="IN" name="phone" countryCallingCodeEditable={false}  className="form-control mb-4" placeholder="Enter Your Number" onBlur={num}  limitMaxLength={true} value={val} onChange={setValue} />
                         <input type="password" name='password'  className="form-control" value={state.password} placeholder="Enter Your Password"  onChange={check}  required/>  <br />
                         <input type="text" name='confirm'  className="form-control" value={state.confirm} placeholder="Enter Your Last Name"  onChange={check} required/>  <br />
                         {/* <input type="number" name='phone' id='number' className="form-control" value={state.phone} placeholder="Enter Your Number" onInput={num}  onChange={check} required maxLength={10}/>  <br /> */}
                          <p className='text-danger'>{errormsg}</p>
                         <button className="btn btn-primary px-5" type="submit">Sign Up</button>
                         <ToastContainer />
                         </form>
                    </div>
              </div>
            </div>
        </div>
    </>
  )
}

export default Register;