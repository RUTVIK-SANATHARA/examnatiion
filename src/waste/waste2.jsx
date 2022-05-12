import React, { useState , useContext} from 'react'
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
    const url = useContext(Info);
    const [img, setimg] = useState({})
    // const api=process.env.REACT_API;
    // console.log(api);
    const [send, setsend] = useState("")
    const [token, settoken] = useState(getToken());
    // console.log("token",token);
    const [service, setservice] = useState([{question:"" ,ques_explain:"", option_a:"" , option_b:"" , option_c:"" , option_d:"" ,answer:"",explanation:"",module:""}  ]);
    const [check, setcheck] = useState(true);
    const [btntext, setbtntext] = useState("Image Field");
    const add = () =>{
        //  setsend({...service})
        
        setservice([...service , {question:"" ,ques_explain:"", option_a:"" , option_b:"" , option_c:"" , option_d:"",answer:"",explanation:"" ,module:""}])
    }

    const remove = (index) =>{
        const list =[...service]
        list.splice(index,1);
    setservice(list)

    }
     
    const handle=(e,index)=>{
        const list =[...service];
        list[index][e.target.name] = e.target.value;
        setservice(list)
    }
     const handleCheck=(id)=>{
            setcheck(!check);
           if(check === true){
               setbtntext("Text Field")
           }else{
                setbtntext("Image Field")
           }
        
     }

    const  handleSubmit = async(e)=> {
         e.preventDefault();
         setsend({...service})
        setservice([...service , {question:"" , option_a:"" , option_b:"" , option_c:"" , option_d:"",answer:"",explanation:""}])
         axios.post(`${url}api/question`,send,{
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
          <form   onSubmit={handleSubmit}>
            <div className="d-flex flex-column  py-4 align-content-center justify-content-center">
          {
                     service.map((ele,index)=>{
                    return(<>
                    <div>
                        {/* <button className="btn btn-primary mx-4 mt-2 mb-4"  onClick={handleCheck}  type='button'>Text Field</button> <button className="btn btn-primary mx-3 mt-2 mb-4" onClick={handleCheck} type='button'>Image</button> */}
                        <button className="btn btn-primary mx-4 mt-2 mb-4"  onClick={()=>handleCheck(index)}  type='button'>{btntext}</button>
                    </div>
                    {  check ? 
                   <div key={index +1}>
                    <span className="mx-3">  {index+1} . </span>  <input type="text" placeholder="Enter new question" className="form-control mx-4" style={{width:"80%"}} name="question"   value={ele.question} onChange={(e)=>handle(e,index)} required/> <br />
                    <input type="file" className="form-control mx-4 w-75 my-2" onChange={(e)=>setimg(e.target.files[0].name)} name="ques_explain" id="ques_explain"   />
                    <input type="text" name="option_a" placeholder='Enter option 1' className="mx-4" id="opt-1" onChange={(e)=>handle(e,index)} value={ele.option_a}/>
                    <input type="text" name="option_b" placeholder='Enter option 2' className="mx-4" id="opt-2" onChange={(e)=>handle(e,index)} value={ele.option_b}/>
                    <input type="text" name="option_c" placeholder='Enter option 3' className="mx-4" id="opt-3" onChange={(e)=>handle(e,index)} value={ele.option_c}/>
                    <input type="text" name="option_d" placeholder='Enter option 4' className="mx-4" id="opt-4" onChange={(e)=>handle(e,index)} value={ele.option_d}/>
                    Answer: <select name="answer" value={ele.answer} onChange={(e)=>handle(e,index)} id="ans">
                         <option value="A">A</option>
                         <option value="B">B</option>
                         <option value="C">C</option>
                         <option value="D">D</option>
                     </select>
                     <span className="mx-4">Module :</span> <select name="module" className="" value={ele.module} onChange={(e)=>handle(e,index)} id="ans">
                         <option value="" disabled>Select Module</option>
                         <option value="C Programming">C Programming</option>
                         <option value="C++">C++</option>
                         <option value="React">React</option>
                         <option value="e programiing">e programiing</option>
                         <option value="Angular">Angular</option>
                         <option value="D Programming">D Programming</option>
                     </select>  
                                 
                         <span className="ms-5">Explanation </span>
                         <textarea name="explanation" onChange={(e)=>handle(e,index)} value={ele.explanation} id="" cols="30" rows="1"></textarea>
                    
                    {/* <button name="btn" type='button' onClick={()=>handleCheck(index)}>Addddd</button> */}
                  { 
                    service.length > 1 && (<button onClick={()=>remove(index)} className="btn btn-primary m-3 mx-4"   type="button">Remove</button> )
                   }
                  {
                   service.length - 1 === index && service.length < 30 &&  <button type="button" className="btn btn-primary mx-4" onClick={add}>Add a New Questions</button> 
                       
                   }
                   <hr />
                   </div>     :   <div key={index +1}>
               <span className="mx-3">  {index+1} . </span>  <input type="text" placeholder="Enter new question" className="form-control mx-4" style={{width:"80%"}} name="service"   value={ele.service} onChange={(e)=>handle(e,index)} required/> <br />
                    <input type="file" name="option_a" className="mx-4" id="opt-1" onChange={(e)=>handle(e,index)} value={ele.option_a}/>
                    <input type="file" name="option_b"  className="mx-4" id="opt-2" onChange={(e)=>handle(e,index)} value={ele.option_b}/>
                    <input type="file" name="option_c"  className="mx-4" id="opt-3" onChange={(e)=>handle(e,index)} value={ele.option_c}/>
                    <input type="file" name="option_d"  className="mx-4" id="opt-4" onChange={(e)=>handle(e,index)} value={ele.option_d}/>
                    <button name="btn" type='button' onClick={()=>handleCheck(index)}>Addddd</button>
                  { 
                    service.length > 1 && (<button onClick={()=>remove(index)} className="btn btn-primary m-3 mx-4"   type="button">Remove</button> )
                   }
                  {
                   service.length - 1 === index && service.length < 30 &&  <button type="button" className="btn btn-primary mx-4" onClick={add}>Add a New Questions</button> 
                       
                   }
                   <hr />
                   </div>  
                }
                   </>
              )
            })
      }
</div>
<div>
  <button type="submit" className="btn btn-primary mx-4" >Submit</button>
</div>
 <ToastContainer />
</form>
           
          </div>
      </div>
  </>
  )
}

export default Addnew



