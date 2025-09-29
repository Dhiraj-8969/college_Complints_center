import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../css/AuthAdmin.css';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function AuthAdmin() {
  const { token, login } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
    if (token) {
      setTimeout(() => navigate('/'), 1500);
    }
  };

  return (
    <div className="container ">
      <div className="card mt-[20px]">
        <div className="mx-auto rounded-full text-center mt-3  w-[80px]">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="admin avatar"
            className="rounded-full"
          />
          <h3 className="text-primary my-2">Login</h3>
        </div>

        <form className='mx-auto' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Admin Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              placeholder="admin@example.com"
              onChange={handleChange}
              required
              autoFocus
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-lg">Login</button>
          </div>
        </form>

        <p className="text-center mt-3 mb-3">
          Don’t have an account?{" "}
          <Link to="/admin-signup">
            <strong>Signup</strong>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthAdmin;
