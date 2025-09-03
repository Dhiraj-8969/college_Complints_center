const mongoose = require("mongoose");
require("dotenv").config();


const connectDB= async ()=>{
    mongoose.connection.on('connected',()=>console.log("Database Connected"))

    await mongoose.connect(process.env.DB_URL)
}


// Call the function to connect
connectDB();

// Export the connection (optional)
module.exports = mongoose.connection;
