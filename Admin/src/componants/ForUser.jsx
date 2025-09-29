import { useState } from 'react';
import axios from 'axios';
import '../css/ForUser.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from "react-toastify";

function ForUser() {
  const { url, token } = useContext(AppContext);
  const [rollNo, setRollNo] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const {data} = await axios.get(`${url}admin/user/${rollNo}`, {
        headers: {token: token},
      });
      if (data.success) {
        setUserData(data.data);
        toast.success('User found. You can now update the password.');
      } else {
        setUserData(null);
        toast.info(data.message || 'User not found.');
      }
    } catch (error) {
      setUserData(null);
      toast.error( 'User not found.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return toast.error('Passwords do not match.');
    try {
      const response = await axios.put(`${url}admin/password`,{ rollNo, newPassword },{headers: {token: token}});
      if(response.data.success){
      toast.success(response.data.message);
      setNewPassword('');
      setConfirmPassword('');
    }
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      toast.error(error.message || 'Error updating password.');
    }
  };

  return (
    <div className="foruser-container">
      <div className="foruser-card">
        <h4 className="foruser-title">Update Password</h4>

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
