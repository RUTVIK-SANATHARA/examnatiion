import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Info } from "../context/api";
import Sidebar from "../component/sidebar";
import { LocalStoragedata } from "../component/local";

const Addnew = () => {
  const [img, setimg] = useState("");
  const url = useContext(Info);
  const [check, setcheck] = useState(true);
  const [btntext, setbtntext] = useState("Image Field");
  let Navigate = useNavigate();
  let api=process.env.REACT_APP_API;
  const token = useContext(LocalStoragedata);
  // console.log("token",token);
  const [service, setservice] = useState([{
    question: "",
    ques_explain: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    answer: "",
    explanation: "",
    module: "",
  }]);
  // const [check, setcheck] = useState(true);
  // const [btntext, setbtntext] = useState("Image Field");
  const add = (e) =>{
    //  setsend({...service})
    e.preventDefault();
      let ind = service.length - 1 ;
     
    axios
      .post(`${api}/api/question`,service[ind], {
        headers: {
          Authorization:
            "Bearer " +
            token.token,
        },
      })
      .then((response) => {
        // console.log(response);

        if (response.status === 200) {
          const notify = () =>
            toast("Successfully register Your Data!", {
              position: "top-center",
              autoClose:500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          notify();
        } else {
          throw new Error(response);
        }
      })
      .catch((error) => {
        // console.log(error);
      });
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

  // const handlechange = (e) => {
  //   //  console.log("",e.target.files);
  //   setservice({
  //     ...service,
  //     [e.target.name]: e.target.value,
  //     ques_explain: img,
  //   });

    
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   axios
  //     .post(`${url}api/question`, service, {
  //       headers: {
  //         Authorization:
  //           "Bearer " +
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgiLCJlbWFpbCI6InJzYW5hdGhhcmFAZ21haWwuY29tIiwiaWF0IjoxNjUyMjU0Mzc4fQ.l-yJg_FZtvXccz2QMNyN3ewz0H-NT4zVWKU5ZDT47eg",
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response);

  //       if (response.status === 200) {
  //         const notify = () =>
  //           toast("Successfully register Your Data!", {
  //             position: "top-center",
  //             autoClose: 2000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: false,
  //             draggable: true,
  //             progress: undefined,
  //           });
  //         notify();
  //       } else {
  //         throw new Error(response);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  //   if (!token.token) {
  //     Navigate("/");
  //   }

  //   if (token.role === "STUDENT") {
  //     Navigate("/");
  //     localStorage.clear();
  //   }
  // }, []);

  return (
    <>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <Link className="navbar-brand ps-3" to="">
          Admin Panel
        </Link>

        <button
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
          to="#!"
        >
          <i className="fas fa-bars"></i>
        </button>
      </nav>
      <div id="layoutSidenav">
        <Sidebar />
        <div id="layoutSidenav_content">
          <div className="mx-5 d-flex flex-column  py-4 align-content-center justify-content-center">
           
            <form onSubmit={add}>
            <div className="d-flex flex-column  py-4 align-content-center justify-content-center">
          {
                     service.map((ele,index)=>{
                    return(<>
                    <div>
                        {/* <button className="btn btn-primary mx-4 mt-2 mb-4"  onClick={handleCheck}  type='button'>Text Field</button> <button className="btn btn-primary mx-3 mt-2 mb-4" onClick={handleCheck} type='button'>Image</button> */}
                        {/* <button className="btn btn-primary mx-4 mt-2 mb-4"  onClick={()=>handleCheck(index)}  type='button'>{btntext}</button> */}
                    </div>
                    {  check ? 
                   <div key={index +1}>
                    <span className="mx-3">  {index+1} . </span>  <input type="text" placeholder="Enter new question" className="form-control mx-4" style={{width:"80%"}}    name="question"   value={ele.question} onChange={(e)=>handle(e,index)} required/> <br />
                    <input type="file" className="form-control mx-4 w-75 my-2" onChange={(e)=>setimg(e.target.files[0].name)} name="ques_explain" id="ques_explain"  />
                    <input type="text" name="option_a" placeholder='Enter option 1' className="mx-4" id="opt-1" onChange={(e)=>handle(e,index)} value={ele.option_a} required/>
                    <input type="text" name="option_b" placeholder='Enter option 2' className="mx-4" id="opt-2" onChange={(e)=>handle(e,index)} value={ele.option_b} required/>
                    <input type="text" name="option_c" placeholder='Enter option 3' className="mx-4" id="opt-3" onChange={(e)=>handle(e,index)} value={ele.option_c} required/>
                    <input type="text" name="option_d" placeholder='Enter option 4' className="mx-4" id="opt-4" onChange={(e)=>handle(e,index)} value={ele.option_d} required/>
                    Answer: <select name="answer" value={ele.answer}  className="form-select-sm" required onChange={(e)=>handle(e,index)} id="ans">
                         <option value="" disabled>Select Answer</option>
                         <option value="A">A</option>
                         <option value="B">B</option>
                         <option value="C">C</option>
                         <option value="D">D</option>
                     </select>
                     <span className="mx-4">Module :</span> <select name="module" required className="form-select-sm" value={ele.module} onChange={(e)=>handle(e,index)} id="ans" >
                         <option value="" disabled >Select Module</option>
                         <option value="C Programming">C Programming</option>
                         <option value="C++">C++</option>
                         <option value="React">React</option>
                         <option value="e programiing">e programiing</option>
                         <option value="Angular">Angular</option>
                         <option value="D Programming">D Programming</option>
                     </select>  
                                 
                         <span className="ms-5">Explanation </span>
                         <textarea name="explanation" onChange={(e)=>handle(e,index)} value={ele.explanation} id="" cols="30" rows="1"  required></textarea>
                    
                    {/* <button name="btn" type='button' onClick={()=>handleCheck(index)}>Addddd</button> */}
                  { 
                    service.length > 1 && (<button onClick={()=>remove(index)} className="btn btn-primary m-3 mx-4"   type="button"  >Remove</button> )
                   }
                  {
                   service.length - 1 === index && service.length < 30 &&  <button type="submit" className="btn btn-primary mx-4" >Add a New Questions</button> 
                       
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
  {   service.length === 30 ? <button type="submit" className="btn btn-primary mx-4" >Submit</button> : null}
</div>
 <ToastContainer />
</form>




          </div>
        </div>
      </div>
    </>
  );
};

export default Addnew;
