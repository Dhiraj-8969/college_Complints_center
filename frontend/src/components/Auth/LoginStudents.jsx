import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css"

function LoginStudents() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    CLG_RollNo: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");

    try {
      const data = await login(formData);

      if (data.success) {
        setMessage("✅ Login successful! Redirecting...");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessage("❌ Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setMessage("❌ Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="Logo"
          className="login-logo"
        />
        <h2 className="login-title">Login</h2>
        <p className="login-subtitle">Enter your roll number and password to continue</p>

        {message && <div className="login-message">{message}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="CLG_RollNo"
            value={formData.CLG_RollNo}
            onChange={handleChange}
            placeholder="Roll Number"
            required
            autoComplete="username"
            suggestions="off"
            />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            autoComplete="current-password"
          />
          <button type="submit">Login</button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to={"/signup"}>Signup</Link></p>
          
        </div>
      </div>
    </div>

  );
}

export default LoginStudents;
