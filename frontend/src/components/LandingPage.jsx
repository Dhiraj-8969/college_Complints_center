import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function LandingPage() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleComplaintClick = () => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/complaint?category=College");
    }
  };
  
  return (
    <div className="container mt-5 p-5" style={{ width: "70%" }}>
      {/* College Complaints Section */}
      <div className="card text-center mb-4">
        <div className="card-header bg-secondary text-white">College Complaints</div>
        <div className="card-body">
          <h5 className="card-title">Report an Issue in College</h5>
          <p className="card-text">
            Facing any academic or administrative issues?<br /> Submit your complaint to get a quick resolution.
          </p>
          <button className="btn btn-outline-dark" onClick={handleComplaintClick}>
            File a Complaint
          </button>
        </div>
        <div className="card-footer text-muted">Your voice matters!</div>
      </div>
    </div>
  );
}

export default LandingPage;

