import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  let navigate = useNavigate();
  // const url = useContext(Info);
  // console.log(url);
  return (
    <>
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
       <Link className="navbar-brand" to="/home">Navbar</Link>
           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <button className="btn btn-primary px-3 mx-5" onClick={()=>navigate("/")}>logout</button>
        </li>
        <li className="nav-item">
          <button className="btn btn-primary px-3 mx-5" onClick={()=>navigate("/change")}>Change Password</button>
        </li>
      </ul>
    </div>
  </div>
</nav> 

<div className="container-fluid d-flex flex-column ">
                <Link className="navbar-brand" to="/home">
                  Navbar
                </Link>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent" 
                
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        aria-current="page"
                        to="/home"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <button
                        className="btn btn-primary px-3 mx-5"
                        onClick={() => navigate("/")}
                      >
                        logout
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="btn btn-primary px-3 mx-5"
                        onClick={() => navigate("/change")}
                      >
                        Change Password
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

*/}
     </>
  );
};

export default Home;
