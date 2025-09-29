import express from "express";
import bcrypt from "bcrypt";
import validator from "validator";
import User from './../models/userSchema.js';
import Complan from './../models/complaintsSchema.js';
import jwtAuthMiddleware from '../Middlewares/AuthMiddleware.js';
import { createSecretToken } from "../util/SecretToken.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, CLG_RollNo, UNI_RollNo, email, password } = req.body;

    if (!name || !password || !email || !CLG_RollNo || !UNI_RollNo) {
      return res.json({ success: false, message: "Missing Details" })
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid Email" })
    }

    const existingUser = await User.findOne({ CLG_RollNo });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }
    const user = await User.create({ email, password, name, CLG_RollNo, UNI_RollNo });
    const token = createSecretToken(user._id, user.CLG_RollNo);

    res.status(201).json({ success: true, message: "User signed in successfully", token });
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
});


router.post('/login', async (req, res) => {
  try {
    const { CLG_RollNo, password } = req.body;

    if (!CLG_RollNo || !password) {
      return res.json({ success: false, message: 'All fields are required' })
    }

    const user = await User.findOne({ CLG_RollNo });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" })
    }
    const auth = await bcrypt.compare(password, user.password)
    if (!auth) {
      return res.json({ success: false, message: 'Invalid credentials' })
    }
    const token = createSecretToken(user._id, user.CLG_RollNo);

    res.json({ success: true, message: "User logged in successfully", token });
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
})


// ✅ Fetch user profile
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Fetch user complaints
    const complaints = await Complan.find({ student_id: userId });

    res.status(200).json({ success: true, data: { user, complaints } });
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
});


// Delete complaint by ID
router.delete('/complaint/:id', jwtAuthMiddleware, async (req, res) => {
  try {
    const complaintId = req.params.id;

    // Ensure only the owner can delete their complaint
    const complaint = await Complan.findOne({
      _id: complaintId,
      student_id: req.user
    });

    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found or unauthorized' });
    }

    await Complan.findByIdAndDelete(complaintId);

    res.status(200).json({ success: true, message: 'Complaint deleted successfully' });
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
});


router.put('/password', jwtAuthMiddleware, async (req, res) => {
  try {
    const { rollNo, newPassword } = req.body;
    if (!rollNo || !newPassword) {
      return res.status(400).json({ success: false, message: 'Roll number and new password are required' });
    }
    const user = await User.findOne({ CLG_RollNo: rollNo });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.password = newPassword;
    await user.save(); 
    res.status(200).json({ success: true, message: 'Password updated successfully.' });
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
});

export default router;