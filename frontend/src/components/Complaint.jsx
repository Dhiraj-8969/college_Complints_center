import { useState, useContext } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function Complaint() {
  const { url, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: "College",
    hostelName: "",
    roomNo: "",
    Branch: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...formData };
    if (dataToSend.category !== "Hostel") {
      delete dataToSend.hostelName; // Remove hostelName if not needed
      delete dataToSend.roomNo; // Remove roomNo if not needed
    }

    try {
      const response = await axios.post(`${url}complaint`, dataToSend, { headers: { token: token } });
      console.log("Response:", response);
      if (response.data.success) {
        toast.success("Complaint submitted successfully!");
        setFormData({
          category: "College",
          hostelName: "",
          roomNo: "",
          Branch: "",
          description: "",
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }else{
        toast.error(response.data.message || "Failed to submit complaint");
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };


  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center text-dark">Submit a Complaint</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <select className="form-select" name="category" value={formData.category} onChange={handleChange}>
              <option value="College">College</option>
              <option value="Hostel">Hostel</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {formData.category === "Hostel" && (
            <>
              <div className="mb-3">
                <label className="form-label">Hostel Name</label>
                <select className="form-select" name="hostelName" value={formData.hostelName} onChange={handleChange}>
                  <option value="">Select Hostel</option>
                  <option value="Baba Deep Singh">Baba Deep Singh</option>
                  <option value="Baba Vinod Singh">Baba Vinod Singh</option>
                  <option value="Baba Aali Singh">Baba Aali Singh</option>
                  <option value="Baba Baze Singh">Baba Baze Singh</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Room Number</label>
                <input
                  type="number"
                  className="form-control"
                  name="roomNo"
                  value={formData.roomNo}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div className="mb-3">
            <label className="form-label">Branch</label>
            <select className="form-select" name="Branch" value={formData.Branch} onChange={handleChange}>
              <option value="">Select Branch</option>
              <option value="AE">AE</option>
              <option value="BBA">BBA</option>
              <option value="BCA">BCA</option>
              <option value="CE">CE</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EE">EE</option>
              <option value="ME">ME</option>
              <option value="MBA">MBA</option>
              <option value="M.TECH">M.TECH</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="text-center d-flex justify-content-center gap-3">
            <NavLink to="/" className="btn btn-outline-dark">Back to Home </NavLink>
            <button type="submit" className="btn btn-outline-dark">Submit Complaint</button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Complaint;
