const express = require("express");
const User = require("../models/userSchema");
const complan = require("../models/complaintsSchema");
const router = express.Router();
const {jwtAuthMiddleware}  = require("../jwt"); // ✅ Correct import

// ✅ Create Complaint (Authenticated Route)
router.post("/",jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; 
    const data = req.body;

    if (!data.category) {
      return res.status(400).json({ error: "Category is required" });
    }

    const newcomplan = new complan({
      ...data,
      student_id: userId, // ✅ Assign user ID
    });

    const response = await newcomplan.save();

    res.status(201).json({ message: "Complaint submitted successfully", response });
  } catch (err) {
    console.error("Error submitting complaint:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Fetch Complaints for Logged-in User
router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const response = await complan.find({ student_id: userId });

    res.status(200).json(response);
  } catch (err) {
    console.error("Error fetching complaints:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Get Status of a Specific Complaint
router.get("/status/:complanId", jwtAuthMiddleware, async (req, res) => {
  try {
    const complanId = req.params.complanId;
    const response = await complan.findById(complanId);

    if (!response) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.status(200).json({ status: response.status });
  } catch (err) {
    console.error("Error fetching complaint status:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Delete a Complaint
router.delete("/status/:complanId", jwtAuthMiddleware, async (req, res) => {
  try {
    const complanId = req.params.complanId;
    const response = await complan.findByIdAndDelete(complanId);

    if (!response) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (err) {
    console.error("Error deleting complaint:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
