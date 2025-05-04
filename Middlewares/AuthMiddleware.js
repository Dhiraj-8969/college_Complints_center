const jwt = require("jsonwebtoken");
const User = require("../models/userSchema"); // Ensure the User model is imported
require("dotenv").config();

const jwtAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Ensure token comes from cookies
        if (!token) return res.status(401).json({ error: "Unauthorized: No token" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request object

        next();
    } catch (err) {
        console.error("JWT Auth Error:", err);
        res.status(403).json({ error: "Invalid token" });
    }
};

module.exports = jwtAuthMiddleware;
