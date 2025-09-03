import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Topbar() {
    const {user, logout } = useContext(AuthContext);
  
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
            {user? (
                <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src="https://bbsbec.edu.in/wp-content/themes/bbsbec/images/logo.png"
              width="50"
              height="50"
              alt="Logo"
            />
            <span className="fw-bold text-primary ms-3">BBSBEC</span>
          </Link>
            ):(
                <Link className="navbar-brand d-flex align-items-center" to="/login">
            <img
              src="https://bbsbec.edu.in/wp-content/themes/bbsbec/images/logo.png"
              width="50"
              height="50"
              alt="Logo"
            />
            <span className="fw-bold text-black ms-3 h2">BBSBEC</span>
          </Link>
            )}
          
            
          <div className="navbar" id="navbarContent">
            <div className="d-flex align-items-center gap-3" style={{ marginLeft: "auto" }}>
              {user ? (
                <>
                  <Link to="/profile">
                    <AccountCircleIcon style={{ fontSize: 30 , color:"black"}} />
                  </Link>
                  <button className="btn" onClick={logout}>Logout</button>
                </>
              ) : (
                <>
                  <Link className="btn btn-outline-black" to="/login">Login</Link>
                  <Link className="btn btn-outline-black" to="/signup">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
  

export default Topbar;
