import express from "express";
import { login, logout, signup, onboard,} from "../controllers/auth.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Protected routes
router.post("/onboarding", protectRoute, onboard);

router.get("/me", protectRoute, (req, res) => {
  // 🔍 Debug logs
  console.log("REQ.USER:", req.user); // should show user object
  console.log("JWT:", req.cookies.jwt); // should show token string

  res.status(200).json({ success: true, user: req.user });
});


// TODO: Add routes like /forgot-password, /reset-password here when needed

export default router;
