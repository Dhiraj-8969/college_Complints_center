import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import "../css/Signup.css"
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';

const AdminSignup = () => {
  const { signup, token } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    code: ''
  });


  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
    if (token) {
      setTimeout(() => navigate("/"), 1500);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="mx-auto rounded-full text-center mt-3 mb-3 w-[80px]">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Admin Icon"

          />
        </div>
        <h3 className='w-[100px] mx-auto'>Signup</h3>
        <form className='mx-auto' onSubmit={handleSubmit}>
          <div >
            <label className='form-label'>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className='form-control'
              autoFocus
            />
          </div>

          <div >
            <label>Email address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="admin@example.com"
            />
          </div>

          <div >
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a secure password"
            />
          </div>

          <div >
            <label>Admin ID</label>
            <input
              type="text"
              style={{ WebkitTextSecurity: 'circle' }}
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Enter unique admin ID"
              required
            />
          </div>

          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>

        <p className='text-center mt-3 '>
          have an account?{" "}
          <Link to="/admin-login">
            <strong>Login</strong>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminSignup