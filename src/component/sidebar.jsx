import React from 'react'
import { Link } from 'react-router-dom'


const Sidebar = (props) => {
    //  console.log(props.clicking);

      
   const expirehandle=()=>{
         localStorage.clear();
    }


  return (
    <>

        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav">
                <p className="text-white text-capitalize mx-3 fs-4">
                  Rutvik
                </p>
                <div className="sb-sidenav-menu-heading">Core</div>
                <Link className="nav-link" to="/admin">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-tachometer-alt"></i>
                  </div>
                  Dashboard
                </Link>

                <Link
                  to="/addque"
                  className="d-flex text-decoration-none text-white-50 my-3"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-columns px-3"></i>
                  </div>
                  Add Question
                </Link>

                <Link
                  className="d-flex text-decoration-none text-white-50 my-3 px-3" 
                  onClick={expirehandle}
                  to="/"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-columns pe-3"></i>
                  </div>
                  Logout
                </Link>

                <Link
                  to="/register"
                  className="d-flex  text-decoration-none text-white-50 my-3 px-3"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-columns pe-3"></i>
                  </div>
                  Register
                </Link>
              </div>
            </div>
            <div className="sb-sidenav-footer">
              <div className="small">Logged in as:</div>
              <p className="text-white text-capitalize">Rutvik</p>
            </div>
          </nav>
        </div>
    </>
  )
}

export default Sidebar