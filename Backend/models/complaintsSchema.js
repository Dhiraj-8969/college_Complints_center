import mongoose from "mongoose";

const complansSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    enum: ["Hostel", "College", "Other"],
    required: true,
  },
  hostelName: {
    type: String,
    enum: ["Baba Deep Singh", "Baba Vinod Singh", "Baba Aali Singh", "Baba Baze Singh"],
    required: function () {
      return this.category === "Hostel"; // ✅ Required only if category is "Hostel"
    },
  },
  roomNo: {
    type: Number,
  },
  Branch: {
    type: String,
    enum: ["AE", "BBA", "BCA", "CE", "CSE", "ECE", "EE", "ME", "MBA", "M.TECH"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Resolved", "In Progress", "On Hold", "Cancelled", "Reopened"],
    default: "Pending",
  },
  feedback: {
    type: String,
    default: "",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Complan = mongoose.models.Complan || mongoose.model("complan", complansSchema);

export default Complan;