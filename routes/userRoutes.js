const express=require('express');
const router = express.Router();
const Complan = require("../models/complaintsSchema")
const User = require('./../models/userSchema');
const { jwtAuthMiddleware, generateToken } = require('./../jwt');

const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
 
router.post("/signup", async (req, res, next) => {
  try {
    const {name, CLG_RollNo,UNI_RollNo, email, password } = req.body;
    const existingUser = await User.findOne({ CLG_RollNo });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, name, CLG_RollNo, UNI_RollNo });
    const token = createSecretToken(user._id, user.CLG_RollNo);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
});



router.post('/login',  async (req, res, next) => {
  try {
    const { CLG_RollNo, password } = req.body;
    if(!CLG_RollNo || !password ){
      return res.json({message:'All fields are required'})
    }
    const user = await User.findOne({ CLG_RollNo });
    if(!user){
      return res.json({message:'Incorrect password or email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }
    const token = createSecretToken(user._id, user.CLG_RollNo);
    res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
     });
     res.status(201).json({ message: "User logged in successfully", success: true, user });
     next()
  } catch (error) {
    console.error(error);
  }
})


// ✅ Fetch user profile
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select('-password');

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Fetch user complaints
      const complaints = await Complan.find({ student_id: req.user.id });

      res.status(200).json({ user, complaints });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});



// router.put('/profile/password', jwtAuthMiddleware, async(req, res) => {
//   try {
//       const userId = req.user.id;
//       const { currentPassword, newPassword } = req.body;
//       console.log(currentPassword, newPassword);
      
//       const user = await User.findById(userId);

//       if (!(await user.comparePassword(currentPassword))) {
//         return res.status(401).json({ error: 'Invalid username or password' });
//       }
//       user.password = newPassword;
//       await user.save();
//       console.log('password updated');
//       res.status(200).json({ massage: 'Password updated' });

//   } catch (err) {
//       console.log(err);
//       res.status(500).json({ error: 'Internal Server Erorr' });
//   }
// });

// Delete complaint by ID
router.delete('/complaint/:id', jwtAuthMiddleware, async (req, res) => {
  try {
    const complaintId = req.params.id;

    // Ensure only the owner can delete their complaint
    const complaint = await Complan.findOne({
      _id: complaintId,
      student_id: req.user.id
    });

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found or unauthorized' });
    }

    await Complan.findByIdAndDelete(complaintId);

    res.status(200).json({ message: 'Complaint deleted successfully' });
  } catch (err) {
    console.error('Error deleting complaint:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



router.put('/password', jwtAuthMiddleware, async (req, res) => {
  try {
    const { rollNo, newPassword } = req.body;

    if (!rollNo || !newPassword) {
      return res.status(400).json({ message: 'Roll number and new password are required' });
    }

    const user = await User.findOne({ CLG_RollNo: rollNo });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = newPassword;
    await user.save(); // Will trigger password hashing in pre-save
    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (err) {
    console.error('Error updating password:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports=router;