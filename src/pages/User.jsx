import React,{useEffect , useState ,useContext} from "react";
import { Link , useNavigate } from "react-router-dom";
import UserSidebar from '../component/UserSidebar';
import "../component/home.css";
import { LocalStoragedata } from "../component/local";
import axios from "axios";



const User = () => {

    
  const token = useContext(LocalStoragedata)
  let api=process.env.REACT_APP_API;
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [lang,setLang]= useState("")
  
  const startExam = () => {
    // e.preventDefault();
    axios.get(`${api}/api/question/modules`,{
      headers: {
        Authorization: "Bearer " + token.token
      }
    })
    .then((response) => {
      setData(response.data.moduleNames)
      // console.log(response);
    })
    .catch(error => {
      // console.log(error);
    })
  }
  useEffect(() => {
    startExam()
  }, [])

  const getStarted=()=>{
    localStorage.setItem("lang",lang)
    navigate('/exam');
  }
  







// rutvik
 
  // console.log(token.token);

useEffect(() => {
 
  if(token.role==="ADMIN"){
    navigate("/");
    // console.log("admin");
    localStorage.clear();
 }
 
}, [])

  return (
    <>
       <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
           <Link className="navbar-brand ps-3" to="/">
            User  Panel
          </Link>

        <button
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
          to="#!"
        >
          <i className="fas fa-bars"></i>
        </button>
      </nav>

      <div id="layoutSidenav"  >
             <UserSidebar/>
            <div id="layoutSidenav_content"  className="text-center">
            <form action="">
            <h1>Select Your Examination Module</h1>
            <div className="container">
              <div className="row text-center my-5 mx-5">
                <label htmlFor=""></label>
                <select name="module" value={lang} onChange={e => setLang(e.target.value)} className="form-select">
                  <option disabled value="">Choose Your language</option>
                {
                  data.map((ele,index) => {
                    return (
                      <>
                        {
                          <option key={index[0]} value={ele.module}>{ele.module}</option>
                        }
                      </>
                    )
                  })
                }
                </select>
                <button className="btn btn-primary my-3" onClick={getStarted}>Get Started</button>
              </div>
            </div>
          </form>
             
            </div>
        </div>
    </>
  );
};

export default User;
