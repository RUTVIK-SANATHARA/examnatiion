import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Addnew = () => {
    const [service, setservice] = useState([{service:" "}  ]);
    
    const add = () =>{
        setservice([...service , {service:""}])
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
                         
                          <Link to="/addques" className="d-flex text-decoration-none text-white-50 my-3">
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
          <form>
            <div className="d-flex flex-column  py-4 align-content-center justify-content-center">
          {
                     service.map((ele,index)=>{
                    return(<>
                   <div key={index +1}>
                   <input type="text" placeholder="Enter new question" className="form-control mx-4" style={{width:"80%"}} name="service"   value={ele.service} onChange={(e)=>handle(e,index)} required/> <br />
                    <input type="text" name="option-1" placeholder='Enter option ' id="opt-1"/>
                    <input type="text" name="option-2" placeholder='Enter option ' id="opt-2"/>
                    <input type="text" name="option-3" placeholder='Enter option ' id="opt-3"/>
                    <input type="text" name="option-4" placeholder='Enter option ' id="opt-4"/>
                  { 
                    service.length > 1 && (<button onClick={()=>remove(index)} className="btn btn-primary m-3 mx-4"   type="button">Remove</button> )
                   }
                  {
                   service.length - 1 === index && service.length < 31 &&  <button type="button" className="btn btn-primary mx-4" onClick={add}>Add a New Questions</button> 
                       
                   }
                   </div>
                   </>
              )
            })
      }
</div>
</form>
           
          </div>
      </div>
  </>
  )
}

export default Addnew



