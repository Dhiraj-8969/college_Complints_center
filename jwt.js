// const jwt = require('jsonwebtoken');
// const JWT_SECRET = "dhiraj12";

// const jwtAuthMiddleware = (req, res, next) => {
//         const authorization = req.headers.authorization;
//         if (!authorization) 
//             return res.status(401).json({ error: 'Token not found' });
//         const token = req.headers.authorization.split(' ')[1];
//         if (!token)
//             return res.status(401).json({ error: 'Unauthorized' });
//         try {
//             const decoded = jwt.verify(token, JWT_SECRET);
//             req.user = decoded
//             next();
//         } catch (err) {
//             console.log(err);
//             res.status(401).json({ error: 'Invalid token' });
//         }
//     }
//     //function to generate jwt token
// const generateToken = (userData) => {
//     return jwt.sign(userData, JWT_SECRET, { expiresIn: 5000 });
// }

// module.exports = { jwtAuthMiddleware, generateToken };

const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ Attach user data to request
    

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

module.exports = { jwtAuthMiddleware };
