import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/Signup.css"; // <-- Make sure to import the CSS

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    CLG_RollNo: "",
    UNI_RollNo: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signup(formData);
      setMessage(data.message || "Signup successful");
      navigate("/");
    } catch (error) {
      console.error(error);
      setMessage("Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
      <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="Logo"
          className="login-logo"
        />
        <h2 className="signup-title">Signup</h2>
        {message && <p className="signup-message">{message}</p>}
        <form onSubmit={handleSubmit} className="signup-form">
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required   autoComplete="username"/>
          <input type="number" name="CLG_RollNo" placeholder="College Roll Number" onChange={handleChange} required />
          <input type="number" name="UNI_RollNo" placeholder="University Roll Number (Optional)" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required  autoComplete="username"/>
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required autoComplete="current-password"/>
          <button type="submit">Sign Up</button>
        </form>
        <p className="signup-footer">
          Already have an account?{" "}
          <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
