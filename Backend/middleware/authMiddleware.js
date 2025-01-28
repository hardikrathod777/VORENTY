const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

module.exports = async (req, res, next) => {
  try {
    // Check for the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Access denied. No token provided." });
    }

    // Extract the token from the header
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "No token provided, authorization denied." });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ msg: "Invalid token." });
    }

    // Find the user in the database
    const user = await User.findById(decoded.id).select("-Password");
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    // Attach the user object to the request
    req.user = user;

    // Proceed to the next middleware
    next();
  } catch (err) {
    console.error("Error in auth middleware:", err.message);

    // Token verification errors
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ msg: "Token is invalid." });
    }

    // Token expired errors
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token has expired." });
    }

    // Catch-all for unexpected errors
    res.status(500).json({ msg: "An error occurred during authentication." });
  }
};
