import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  const url = 'http://localhost:3000/';

  const fetchComplaints = async () => {
    try {
      const { data } = await axios.get(`${url}admin`, {
        headers: { token: token }
      });
      if (data.success) {
        setComplaints(data.data);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const signup = async (formData) => {
    try {
      const { data } = await axios.post(`${url}admin/signup`, formData);
      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        toast.success(data.message)
      } else {
        toast.error(data.message || "Failed to fetch data");
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };


  const login = async (formData) => {
    try {
      const { data } = await axios.post(`${url}admin/login`, formData);
      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        toast.success(data.message)
      } else {
        toast.error(data.message || "Failed to fetch data");
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    toast.success("User logged out successfully");
    navigate("/admin-login");
  };

  useEffect(() => {
    if (token) {
      navigate("/");
      fetchComplaints();
    }
  }, [token]);

  return (
    <AppContext.Provider value={{ url, token, loading, signup, login, logout, complaints, setComplaints}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
