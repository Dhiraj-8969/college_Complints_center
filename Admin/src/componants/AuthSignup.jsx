import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../css/Signup.css"

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    code: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3000/admin/signup', formData, {
        withCredentials: true,
      });
      setMessage(res.data.message);
      setFormData({ name: '', email: '', password: '', code: '' });
      localStorage.setItem('adminToken', res.data.token);
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
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

      {message && <div className="alert success">{message}</div>}
      {error && <div className="alert error">{error}</div>}

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

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
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

export default AdminSignup;
