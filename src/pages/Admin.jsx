import axios from "axios";
import React, { useEffect, useState , useContext } from "react";
import Sidebar from "../component/sidebar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../component/home.css";
import { LocalStoragedata } from "../component/local";




const Admin = (props) => {
  // console.log(props.exp);
   let Navigate = useNavigate();
  const [student, setStudent] = useState([]);
  // const [data, setData] = useState(getToken())
  let token = useContext(LocalStoragedata);
  // console.log(token.token);

  useEffect(() => {
    axios
      .get("http://192.168.0.138:5000/api/student/all", {
        headers: {
          Authorization: "Bearer " + token.token,
        },
      })
      .then((response) => {
        setStudent(response.data.student);
      })
      .catch((error) => {
        console.log(error);
      });

  
   if(token.role==="STUDENT"){
      Navigate("/");
      console.log("admin");
      localStorage.clear();
   }
   if(!token.token){
    Navigate("/");
    window.location.reload();
  }
     

 
  }, []);








  return (
    <>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <Link className="navbar-brand ps-3" to="index.html">
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

         <Sidebar/>

        <div id="layoutSidenav_content">
          <div>
            <h1 className="text-center pt-3 pb-5">List of All Students</h1>
            <div className="mx-5">
              <table className="table table-hover ">
                <thead>
                  <tr>
                    <th scope="col">Sr No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {student.map((ele, ind) => {
                    return (
                      <>
                        <tr>
                          <th scope="row">{ind + 1}</th>
                          <td>{ele.name}</td>
                          <td>{ele.email}</td>
                          <td>{ele.phone_number}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
