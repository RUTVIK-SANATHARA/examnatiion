import React, { useState  , useContext} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Info } from '../context/api'

const getToken=()=>{
  let tokenstore = localStorage.getItem("logintoken");
  if(tokenstore){
    return localStorage.getItem("logintoken");
  }else{
    return null;
  }
}


const Addnew = () => {
  const [send, setsend] = useState({})
  const [img, setimg] = useState("")
    const url = useContext(Info);
    const [token, settoken] = useState(getToken());
    // console.log("token",token);
    const [service, setservice] = useState({question:"" , ques_explain:"" , option_a:"" , option_b:"" , option_c:"" , option_d:"" ,answer:"",explanation:"",module:""});
    // const [check, setcheck] = useState(true);
    // const [btntext, setbtntext] = useState("Image Field");
    // const add = () =>{
    //     setservice({question:"" , option_a:"" , option_b:"" , option_c:"" , option_d:"",answer:"",explanation:"",module:""});
    // }

    // const remove = (index) =>{
    //     const list =[...service]
    //     list.splice(index,1);
    // setservice(list)

    // }
     
    // const handle=(e,index)=>{
    //     const list =[...service];
    //     list[index][e.target.name] = e.target.value;
    //     setservice(list)
    // }
    //  const handleCheck=(id)=>{
    //         setcheck(!check);
    //        if(check === true){
    //            setbtntext("Text Field")
    //        }else{
    //             setbtntext("Image Field")
    //        }
        
    //  }

     const handlechange=(e)=>{
      //  console.log("",e.target.files);
       setservice({
                ...service,
                [e.target.name]:e.target.value,
                ques_explain:img
      })




      //  let read =  new FileReader();
      //  read.readAsDataURL(file[0])

      //  read.onload=(e)=>{
      //        console.log(e.target.result);

      //        setservice({
      //         ...service,
      //         [e.target.name]:e.target.value,
      //         ques_explain:read
      //       })
      //  }
         
     }

    const  handleSubmit = async(e)=> {
         e.preventDefault();
         axios.post(`${url}api/question`,service,{
          headers:{
            Authorization:"Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgiLCJlbWFpbCI6InJzYW5hdGhhcmFAZ21haWwuY29tIiwiaWF0IjoxNjUyMjU0Mzc4fQ.l-yJg_FZtvXccz2QMNyN3ewz0H-NT4zVWKU5ZDT47eg"
          }
        }).then(response=>{
          console.log(response)
         
          if(response.status===200)
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
                
                
          }else{
              throw new Error(response)
          }
      })
      .catch(error =>  { console.log(error);});
     }
     



  return (
    <>
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <a className="navbar-brand ps-3" href="#">
        Admin Panel
      </a>

      <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
        href="#!"
      >
        <i className="fas fa-bars"></i>
      </button>

      <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="Search for..."
            aria-label="Search for..."
            aria-describedby="btnNavbarSearch"
          />
          <button className="btn btn-primary" id="btnNavbarSearch" type="button">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>

      <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-user fa-fw"></i>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <a className="dropdown-item" href="#!">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#!">
                Activity Log
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#!">
                Logout
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>

    <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
              <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                  <div className="sb-sidenav-menu">
                      <div className="nav">
                          <div className="sb-sidenav-menu-heading">Core</div>
                          <Link className="nav-link" to="index.html">
                              <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Dashboard
                          </Link>
                         
                          <Link to="/addque" className="d-flex text-decoration-none text-white-50 my-3">
                              <div className="sb-nav-link-icon"><i className="fas fa-columns px-3"></i></div>
                              Add Questions
                             
                          </Link>

                          <Link to="/change" className="d-flex text-decoration-none text-white-50 my-3">
                              <div className="sb-nav-link-icon"><i className="fas fa-columns px-3"></i></div>
                                Change Password
                            
                          </Link>


                          <Link to="/" className="d-flex text-decoration-none text-white-50 my-3 px-3">
                              <div className="sb-nav-link-icon"><i className="fas fa-columns pe-3"></i></div>
                                 Logout
                              
                          </Link>

                          <Link to="/register" className="d-flex  text-decoration-none text-white-50 my-3 px-3">
                              <div className="sb-nav-link-icon"><i className="fas fa-columns pe-3"></i></div>
                                Register
                              
                          </Link>
                      </div>
                  </div>
                  <div className="sb-sidenav-footer">
                      <div className="small">Logged in as:</div>
                      Start Bootstrap
                  </div>
              </nav>
          </div>
          <div id="layoutSidenav_content">
                <form action="" onSubmit={handleSubmit}>
                    <input type="text" className="form-control" onChange={handlechange} name="question" id="question" placeholder='Enter your Question' value={service.question} />
                    <input type="file" className="form-control" onChange={(e)=>setimg(e.target.files[0].name)} name="ques_explain" id="ques_explain"   />
                    
                    <input type="text" className="form-control" onChange={handlechange} name="option_a" id="option_a" placeholder='Enter your option A' value={service.option_a} />
                    <input type="text" className="form-control" onChange={handlechange} name="option_b" id="option_b" placeholder='Enter your option B' value={service.option_b} />
                    <input type="text" className="form-control" onChange={handlechange} name="option_c" id="option_c" placeholder='Enter your option C' value={service.option_c} />
                    <input type="text" className="form-control" onChange={handlechange} name="option_d" id="option_d" placeholder='Enter your option D' value={service.option_d} />
                    <textarea name="explanation" id="module" onChange={handlechange} value={service.explanation} cols="30"  rows="1"></textarea>
                    Answer: <select name="answer"  value={service.answer} onChange={handlechange} id="ans">
                         <option value="">Select Answer</option>
                         <option value="A">A</option>
                         <option value="B">B</option>
                         <option value="C">C</option>
                         <option value="D">D</option>
                     </select> 

                     Module: <select name="module"  value={service.module} onChange={handlechange} id="ans">
                         <option value="" disabled>Select Module</option>
                         <option value="C Programming">C Programming</option>
                         <option value="C++">C++</option>
                         <option value="React">React</option>
                         <option value="e programiing">e programiing</option>
                         <option value="Angular">Angular</option>
                         <option value="D Programming">D Programming</option>
                     </select>
                    <button className="btn btn-primary mx-4" >Submit</button>
                </form>   
           
          </div>
      </div>
  </>
  )
}

export default Addnew






 
let navigate = useNavigate();
const [student, setStudent] = useState({});
const [token, setToken] = useState(getToken());

useEffect(() => {
  axios
    .get("http://192.168.0.138:5000/api/student", {
      headers: {
        Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjciLCJlbWFpbCI6InJzYW5hdGhhcmE3QGdtYWlsLmNvbSIsImlhdCI6MTY1MjMzMjkyOH0.FfrLvW4RkA4cPRyNoj8lvLq2P0fseTMYdIeX-pH8u_w",
      },
    })
    .then((response) => {
      console.log(response.data.student);
      setStudent(response.data.student);
    })
    .catch((error) => {
      console.log(error);
    });
}, []);