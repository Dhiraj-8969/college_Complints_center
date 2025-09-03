import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // or '' if you prefer
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ moved inside the component

  // Load user from localStorage if needed
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // Signup
  const url='https://college-complints-backend.onrender.com/';

  const signup = async (formData) => {
    const res = await axios.post(`${url}user/signup`, formData, {
      withCredentials: true,
    });
    setUser(res.data.user);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data;
  };

  // Login
  const login = async (formData) => {
    const res = await axios.post(`${url}user/login`, formData, {
      withCredentials: true,
    });
    if (res.data.success) {
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    }
    return res.data;
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login"); // ✅ navigate now works fine
  };

  return (
    <AuthContext.Provider value={{url,user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
