import React, { use, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import ComplaintsHistory from "./ComplaintHistory";
import axios from "axios";
import { toast } from "react-toastify";

function Profile() {
  const { token, url, userData, setUserData } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(`${url}user/profile`, { headers: { token: token } });
        if (data.success) {
          setUserData(data.data);
          setLoading(false);
        } else {
          toast.error(data.message || "Failed to fetch data");
        }
      } catch (error) {
        toast.error(error.message);
        console.error(error);
      }
    };

    if (token) {
      fetchUserData();
    } else {
      setError("User not logged in.");
      setLoading(false);
    }
  }, [token]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return [userData] && (
    <div className="container mt-4">
      <div className="card shadow-lg p-4">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h3 className="text-dark fw-bold">{userData.user.name}</h3>
            <p><strong>Email:</strong> {userData.user.email}</p>
            <p><strong>Roll No:</strong> {userData.user.CLG_RollNo}</p>
            <p><strong>Registered Complaints:</strong> {/* Will be passed as prop */}</p>
          </div>
        </div>
      </div>

      {/* Pass the user's complaints to ComplaintsHistory */}
      <ComplaintsHistory />
    </div>
  );
}

export default Profile;

