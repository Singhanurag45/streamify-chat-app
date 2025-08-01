import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    // Extract JWT from cookies
    const token = req.cookies?.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    // Optional: Debugging logs
    console.log("Cookies:", req.cookies);
    console.log("JWT Token:", token);

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded?.userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Invalid token payload" });
    }

    // Find user in database
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user to request object for downstream use
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error);
    return res
      .status(401)
      .json({ message: "Unauthorized - Invalid or expired token" });
  }
};
