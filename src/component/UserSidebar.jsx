import React from 'react'
import { Link } from 'react-router-dom'

const UserSidebar = () => {
    // console.log(expire);
    const expirehandle=()=>{
        localStorage.clear();
   }

  return (
    <>
    <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Core</div>
                            <Link className="nav-link" to="/">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                  Home
                            </Link>
                           
                            <Link to="/user" className="d-flex text-decoration-none text-white-50 my-3">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns px-3"></i></div>
                                Start Examinatuon 
                            </Link>

                            <Link to="/" className="d-flex text-decoration-none text-white-50 my-3 px-3 "    onClick={expirehandle}>
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
    </>
  )
}

export default UserSidebar