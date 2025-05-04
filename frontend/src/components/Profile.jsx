import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import ComplaintsHistory from "./ComplaintHistory"; // Import ComplaintsHistory component

function Profile() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      setError("User not logged in.");
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h3 className="text-dark fw-bold">{user?.name}</h3>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Roll No:</strong> {user?.CLG_RollNo}</p>
            <p><strong>Registered Complaints:</strong> {/* Will be passed as prop */}</p>
          </div>
        </div>
      </div>

      {/* Pass the user's complaints to ComplaintsHistory */}
      <ComplaintsHistory user={user} />
    </div>
  );
}

export default Profile;

