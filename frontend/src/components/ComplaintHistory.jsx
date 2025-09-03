import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import removeIcon from './assets/remove.png'; // Adjust if necessary
import { AuthContext } from "../context/AuthContext";

function ComplaintsHistory({ user }) {
  const {url} = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  function capitalizeWords(sentence) {
    return sentence.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }
  useEffect(() => {
    if (!user) return;

    const fetchComplaints = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        const response = await axios.get(`${url}user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setComplaints(response.data.complaints);
      } catch (err) {
        setError("Failed to load complaints.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [user]);

  const handleDeleteComplaint = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      await axios.delete(`${url}user/complaint/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setComplaints((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert("Failed to delete complaint.");
      console.error(err);
    }
  };

  const handleToggleFeedback = (complaintId) => {
    setSelectedComplaint(prev => (prev === complaintId ? null : complaintId));
  };

  if (loading) return <p className="text-muted text-center mt-3">Loading...</p>;
  if (error) return <p className="text-danger text-center mt-3">{error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Complaint History</h2>
      {complaints.length > 0 ? (
        <ul className="list-group">
          {[...complaints].reverse().map((complaint, index) => (
            <li key={index} className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start gap-2">
              <div className="flex-grow-1">
                <p className="mb-1 fw-bold">{complaint.description}</p>
                <button
                  className="btn btn-link btn-sm text-decoration-none"
                  onClick={() => handleToggleFeedback(complaint._id)}
                >
                  {selectedComplaint === complaint._id ? <div style={{ width: '100%', minWidth: '300px' }}></div> : "Show Feedback"}
                </button>
                {selectedComplaint === complaint._id && (
                  <p className="mb-2 text-muted font-semibold">
                    <span className="font-[900] text-black">Feedback:</span> {capitalizeWords(complaint.feedback) || <span className="text-secondary">No Feedback Given</span>}
                  </p>
                )}
              </div>

              <div className="d-flex align-items-center gap-2">
                <span className={`badge ${getBootstrapStatusBadge(complaint.status)} px-3 py-2`}>
                  {complaint.status}
                </span>
                <img
                  src={removeIcon}
                  alt="Remove"
                  width="24"
                  role="button"
                  className="ms-2"
                  onClick={() => handleDeleteComplaint(complaint._id)}
                />

              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted text-center">No complaints registered yet.</p>
      )}
    </div>
  );
}

const getBootstrapStatusBadge = (status) => {
  switch (status) {
    case "Resolved":
      return "bg-success text-white";
    case "Pending":
      return "bg-warning text-dark";
    case "Rejected":
      return "bg-danger text-white";
    default:
      return "bg-secondary text-white";
  }
};

export default ComplaintsHistory;
