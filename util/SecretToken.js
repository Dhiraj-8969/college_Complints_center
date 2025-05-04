require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id, CLG_RollNo) => {
  return jwt.sign({ id, CLG_RollNo }, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
