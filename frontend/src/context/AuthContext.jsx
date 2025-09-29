import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const url = 'https://college-complints-backend.onrender.com/';


  const signup = async (formData) => {
    try {
      const {data} = await axios.post(`${url}user/signup`, formData);
      console.log(data);
    if (data.success) {
        localStorage.setItem('token',data.token)
        setToken(data.token)
        toast.success(data.message)
      }else{
        toast.error(data.message || "Failed to fetch data");
      }
  } catch (error) {
      toast.error(error.message);
      console.error(error);
  }
};

  // Login
  const login = async (formData) => {
    try {
      const {data} = await axios.post(`${url}user/login`, formData);
      console.log(data);
      if (data.success) {
        localStorage.setItem('token',data.token)
        setToken(data.token)
        toast.success(data.message)
      }else{
        toast.error(data.message || "Failed to fetch data");
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
  } 
};
  // Logout
  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    toast.success("User logged out successfully");
    navigate("/login");
  };

useEffect(() => {
    if (token) {
      navigate("/");
    }
 }, [token]);

  return (
    <AuthContext.Provider value={{url, token, loading, signup, login, logout, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
