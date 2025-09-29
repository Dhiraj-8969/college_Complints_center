import express from "express";
import complan from './../models/complaintsSchema.js';
import jwtAuthMiddleware from '../Middlewares/AuthMiddleware.js'

const router = express.Router();

// ✅ Create Complaint (Authenticated Route)
router.post("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user; 
    const data = req.body;

    if (!data.category) {
      return res.status(400).json({ success: false, message: "Category is required" });
    }

    const newcomplan = new complan({
      ...data,
      student_id: userId, 
    });

    const response = await newcomplan.save();

    res.status(201).json({ success: true, message: "Complaint submitted successfully", data: response });
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
});

// ✅ Fetch Complaints for Logged-in User
router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user;
    const response = await complan.find({ student_id: userId });

    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
});

// ✅ Get Status of a Specific Complaint
router.get("/status/:complanId", jwtAuthMiddleware, async (req, res) => {
  try {
    const complanId = req.params.complanId;
    const response = await complan.findById(complanId);

    if (!response) {
      return res.status(404).json({success: false, message: "Complaint not found" });
    }

    res.status(200).json({success: true, status: response.status });
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
});

// ✅ Delete a Complaint
router.delete("/status/:complanId", jwtAuthMiddleware, async (req, res) => {
  try {
    const complanId = req.params.complanId;
    const response = await complan.findByIdAndDelete(complanId);

    if (!response) {
      return res.status(404).json({ success: false, message: "Complaint not found" });
    }

    res.status(200).json({ success: true, message: "Complaint deleted successfully" });
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
});

export default router;
