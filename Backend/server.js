import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from './config/mongodb.js';
import dotenv from "dotenv";
dotenv.config();

const app = express()
const PORT = process.env.PORT || 3001;
connectDB()

app.use(cookieParser())
app.use(express.json())
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  })
);
app.options("*", cors());

import userRoutes from "./routes/userRoutes.js";
app.use("/user", userRoutes);

import adminRoutes from "./routes/adminRoutes.js";
app.use("/admin", adminRoutes);

import complanRoutes from "./routes/complanRoutes.js";
app.use("/complaint", complanRoutes);

app.get('/',(req,res)=>{
res.send('API working')
})


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
