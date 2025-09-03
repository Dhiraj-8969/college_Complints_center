const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("./db.js");
require("dotenv").config();

const app = express();

// ✅ Allow CORS with Credentials before routes
app.use(
  cors({
    origin: ["https://college-complaints-frontend.onrender.com", "https://college-complaints-admin.onrender.com"], // Allow both origins
    credentials: true, // Allow cookies
  })
);



app.use(cookieParser()); 
app.use(express.json());


const userRoutes = require("./routes/userRoutes.js");
app.use("/user", userRoutes);

const adminRoutes = require("./routes/adminRoutes.js");
app.use("/admin", adminRoutes);

const complanRoutes = require("./routes/complanRoutes.js");
app.use("/complaint", complanRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
