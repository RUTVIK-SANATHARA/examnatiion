import React from 'react'
import { Link} from 'react-router-dom'
import UserSidebar from '../component/UserSidebar';


const Exam = () => {
     
  return (
      <>

    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
       <Link className="navbar-brand ps-3" to="index.html">
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
      <div id="layoutSidenav">
           <UserSidebar/>
     
          <div id="layoutSidenav_content">
                
          </div>
      </div>
    </>
  )
}

export default Exam