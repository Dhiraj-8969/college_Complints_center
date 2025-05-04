import React, { useState } from 'react';
import axios from 'axios';
import '../css/ForUser.css';
import { useNavigate } from 'react-router-dom';

function ForUser() {
  const [rollNo, setRollNo] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSearch = async () => {
    setMessage('');
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:3000/admin/user/${rollNo}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setUserData(response.data);
      setMessage('User found. You can now update the password.');
    } catch (error) {
      setUserData(null);
      setMessage(error.response?.data?.message || 'User not found.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData) return setMessage('Search for a valid user first.');
    if (newPassword !== confirmPassword) return setMessage('Passwords do not match.');

    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(
        'http://localhost:3000/admin/password',
        { rollNo, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setMessage(response.data.message || 'Password updated successfully.');
      setNewPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        setMessage('');
        navigate("/");
      }, 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error updating password.');
    }
  };

  return (
    <div className="foruser-container">
      <div className="foruser-card">
        <h4 className="foruser-title">Update Password</h4>

        {message && (
          <div className={`foruser-alert ${message.toLowerCase().includes('updated') || message.toLowerCase().includes('found') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <div className="form-group">
          <label>Roll Number</label>
          <div className="input-row">
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              placeholder="Enter roll number"
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>

        {userData && (
          <div className="user-info">
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
          </div>
        )}

        {userData && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                autoComplete="off"
              />
            </div>
            <button type="submit" className="submit-btn">Update</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForUser;
