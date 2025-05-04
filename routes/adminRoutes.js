const express=require('express');
const router = express.Router();
const User = require('./../models/userSchema');
const complan = require('./../models/complaintsSchema');
const Admin = require('./../models/adminSchema');
const {AdminSecretToken} = require("../util/AdminSecretToken")

router.post('/signup', async (req, res) => {
    const { name, email, password , code } = req.body;
  
    if (!name || !email || !password || !code) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    
    if (code !== process.env.SECRET_CODE) {
      return res.status(400).json({ message: "Admin ID" });
    }
    
    try {
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(409).json({ message: 'Email already in use.' });
      }
  
      const newAdmin = new Admin({ name, email, password });
      await newAdmin.save();
  
      const token = AdminSecretToken(newAdmin._id)

      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
  
      res.status(201).json({
        message: 'Admin registered successfully.',
        token,
        admin: newAdmin,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error.' });
    }
  });
  
  // Admin Login
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
  
    try {
      const admin = await Admin.findOne({ email });
  
      if (!admin) {
        return res.status(401).json({ message: 'admin not found.' });
      }
  
      const isMatch = await admin.comparePassword(password);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }

      const token = AdminSecretToken(admin._id);
  
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false, // Consider setting to true for more security
      });
  
      res.status(200).json({
        message: 'Login successful.',
        token,
        admin: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error.' });
    }
  });
  



router.get('/', async(req, res) => {
    try {
     
        const response = await complan.find().populate('student_id', 'name CLG_RollNo');

        if(!response.length){
            return res.status(401).json({ massage: "Not any Complaints" });
        }
        res.status(200).json(response);
  
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Erorr' });
    }
  });


  router.get('/user/:rollNo', async (req, res) => {

    try {
        const user = await User.findOne({ CLG_RollNo: req.params.rollNo }).select('-password');
       
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.put('/password', async (req, res) => {
    try {
        const { rollNo, newPassword } = req.body;
        const user = await User.findOne({ CLG_RollNo: rollNo });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


  router.put('/complaints/:id', async (req, res) => {
    try {
      
        const complanId = req.params.id; 
        const {updateStatus, feedback}= req.body; 
        const response = await complan.findByIdAndUpdate(complanId,
          {status: updateStatus,feedback}, {
            new: true,
            runValidators: true,
        });

        if (!response) {
            return res.status(404).json({ error: 'Complaint not found' });
        }
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports=router;            