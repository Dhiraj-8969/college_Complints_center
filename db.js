const mongoose = require("mongoose");
require("dotenv").config();

// Use the correct database name
const mongoURL = "mongodb://127.0.0.1:27017/report";

// Function to connect to MongoD
async function connectDB() {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // Exit the process if connection fails
  }
}

// Call the function to connect
connectDB();

// Export the connection (optional)
module.exports = mongoose.connection;
