import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Topbar() {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">

      <div className="container">
        {token ? (
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img
              src="https://bbsbec.edu.in/wp-content/themes/bbsbec/images/logo.png"
              width="50"
              height="50"
              alt="Logo"
            />
            <span className="fw-bold text-primary ms-3">BBSBEC</span>
          </NavLink>
        ) : (
          <NavLink className="navbar-brand d-flex align-items-center" to="/login">
            <img
              src="https://bbsbec.edu.in/wp-content/themes/bbsbec/images/logo.png"
              width="50"
              height="50"
              alt="Logo"
            />
            <span className="fw-bold text-black ms-3 h2">BBSBEC</span>
          </NavLink>
        )}
        <div className="navbar" id="navbarContent">
          <div className="d-flex align-items-center gap-3" style={{ marginLeft: "auto" }}>
            
              <NavLink className="btn btn-outline-black" to="/about">About Us</NavLink>
              <NavLink className="btn btn-outline-black" to="/contact">Contact Us</NavLink>
              <NavLink className="btn btn-outline-black" to="/feedback">Feedback</NavLink>
            {token ? (
              <>
                <button className="btn" onClick={logout}>Logout</button>
                <NavLink to="/profile">
                  <AccountCircleIcon style={{ fontSize: 30, color: "black" }} />
                </NavLink>
              </>
            ) : (
              <>
                <NavLink className="btn btn-outline-black" to="/login">Login</NavLink>
                <NavLink className="btn btn-outline-black" to="/signup">Sign Up</NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}


export default Topbar;
