import express from "express";
import User from './../models/userSchema.js';
import complan from './../models/complaintsSchema.js';
import Admin from './../models/adminSchema.js';
import jwtAuthMiddleware from '../Middlewares/AuthMiddleware.js';
import { AdminSecretToken } from "../util/AdminSecretToken.js";

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, code } = req.body;
    if (!name || !email || !password || !code) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    if (code !== process.env.SECRET_CODE) {
      return res.status(400).json({ success: false, message: "Invalid admin code." });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ success: false, message: 'Email already in use.' });
    }
    const newAdmin = new Admin({ name, email, password });
    const admin = await newAdmin.save();

    const token = AdminSecretToken(admin._id)

    res.status(201).json({ success: true, message: 'Admin registered successfully.', token });
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
});

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ success: false, message: 'admin does not exist' });
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }
    const token = AdminSecretToken(admin._id);

    res.status(200).json({success: true, message: 'Login successful.', token});
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message });
  }
});

router.get('/', jwtAuthMiddleware , async (req, res) => {
  try {
    const response = await complan.find().populate('student_id', 'name CLG_RollNo');

    if (response.length === 0) {
      return res.status(401).json({success: false, message: "Not any Complaints" });
    }
    res.status(200).json({success: true, data: response});

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
});


router.get('/user/:rollNo', jwtAuthMiddleware, async (req, res) => {
  const rollNo = req.params.rollNo;
  try {
    const user = await User.findOne({ CLG_RollNo: rollNo }).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
});

router.put('/password', jwtAuthMiddleware, async (req, res) => {
  try {
    const { rollNo, newPassword } = req.body;
    const user = await User.findOne({ CLG_RollNo: rollNo });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
});


router.put('/complaints/:id', jwtAuthMiddleware, async (req, res) => {
  try {

    const complanId = req.params.id;
    const { updateStatus, feedback } = req.body;
    const response = await complan.findByIdAndUpdate(complanId,
      { status: updateStatus, feedback }, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }
    res.status(200).json({ success: true, data: response });

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
});

export default router;