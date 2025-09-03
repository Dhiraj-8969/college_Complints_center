import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import axios from "axios";

function ManageCom() {
  const [allComplaints, setAllComplaints] = useState([]);
  const [token, setToken] = useState("");
  const [filter, setFilter] = useState("All");
  const [feedbackInputs, setFeedbackInputs] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (storedToken) {
      setToken(storedToken);
    } else {
      navigate("/admin-login");
    }
  }, [navigate]);

  useEffect(() => {
    if (!token) return;

    axios
      .get("https://college-complints-backend.onrender.com/admin", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((res) => {
        setAllComplaints(res.data);
      })
      .catch((error) => {
        console.error("Error fetching complaints:", error);
      });
  }, [token]);

  const handleStatusChange = (complaintId, newStatus) => {
    const feedback = feedbackInputs[complaintId] || "";

    axios
      .put(`https://college-complints-backend.onrender.com/admin/complaints/${complaintId}`, {
        updateStatus: newStatus,
        feedback,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Status updated:", res.data);

        // Update complaints locally
        setAllComplaints((prev) =>
          prev.map((c) =>
            c._id === complaintId ? { ...c, status: newStatus, feedback } : c
          )
        );

        // ✅ Clear textarea after successful update
        setFeedbackInputs((prevInputs) => ({
          ...prevInputs,
          [complaintId]: "",
        }));
      })
      .catch((err) => {
        console.error("Error updating:", err);
      });
  };


  const filteredComplaints = allComplaints.filter((c) => {
    if (filter === "All") return true;
    if (filter === "College" || filter === "Hostel") return c.category === filter;
    if (filter === "Pending" || filter === "Resolved") return c.status === filter;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {["All", "College", "Hostel", "Pending", "Resolved"].map((btn) => (
          <button
            key={btn}
            onClick={() => setFilter(btn)}
            className={`px-4 py-2 rounded-full border transition ${filter === btn
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {btn}
          </button>
        ))}
      </div>

      {/* Complaints Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredComplaints.length > 0 ? (
          filteredComplaints.map((complaint) => (
            <div
              key={complaint._id}
              className="bg-white p-4 rounded-2xl shadow-md relative flex flex-col justify-between"
            >
              <span className="absolute top-4 right-4 text-sm text-gray-400">
                {format(new Date(complaint.created_at), 'dd MMM yyyy, hh:mm a')}
              </span>

              <h5 className="text-lg font-semibold mb-2">Category: {complaint.category}</h5>

              {complaint.category === "College" && (
                <p><span className="font-semibold">Branch:</span> {complaint.Branch}</p>
              )}
              {complaint.category === "Hostel" && (
                <>
                  <p><span className="font-semibold">Hostel Name:</span> {complaint.hostelName}</p>
                  <p><span className="font-semibold">Room No:</span> {complaint.roomNo}</p>
                </>
              )}

              <p><span className="font-semibold">Description:</span> {complaint.description}</p>
              <p><span className="font-semibold">Student Name:</span> {complaint.student_id?.name}</p>
              <p><span className="font-semibold">Roll No:</span> {complaint.student_id?.CLG_RollNo}</p>

              {/* Status */}
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <label className="font-semibold">Status:</label>
                  <select
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                    value={complaint.status}
                    onChange={(e) =>
                      handleStatusChange(complaint._id, e.target.value, complaint.feedback)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${complaint.status === "Resolved"
                      ? "bg-green-100 text-green-800"
                      : complaint.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                >
                  {complaint.status}
                </span>
              </div>

              {/* Feedback */}
              <div className="mt-4">
                <label htmlFor={`feedback-${complaint._id}`} className="block font-semibold mb-1">
                  Feedback:
                </label>
                <textarea
                  id={`feedback-${complaint._id}`}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                  rows="3"
                  placeholder="Enter your feedback here"
                  value={feedbackInputs[complaint._id] ?? complaint.feedback ?? ""}
                  onChange={(e) =>
                    setFeedbackInputs((prev) => ({
                      ...prev,
                      [complaint._id]: e.target.value,
                    }))
                  }
                />
                <button
                  onClick={() =>
                    handleStatusChange(
                      complaint._id,
                      complaint.status,
                      feedbackInputs[complaint._id]
                    )
                  }
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded text-sm"
                >
                  Save Feedback
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No complaints found.</p>
        )}
      </div>
    </div>
  );
}

export default ManageCom;
