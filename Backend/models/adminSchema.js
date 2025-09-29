import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Admin Schema
const AdminSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
});

// Hash password before saving
AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare password
AdminSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
export default Admin;
