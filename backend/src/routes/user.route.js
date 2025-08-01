import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getRecommendedUsers,
  getMyFriends,
  sendFriendRequest,
  acceptFriendRequest,
  getMyFriendRequests,
  getOutgoingFriendReqs, // ✅ No error if function is implemented
} from "../controllers/user.controller.js";

const router = express.Router();

router.use(protectRoute); // Protect all routes

// 📌 Routes
router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);
router.post("/friends-request/:id", sendFriendRequest);
router.put("/friends-request/:id/accept", acceptFriendRequest);
router.get("/friends-request", getMyFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendReqs); // ✅ Will now work

// Optional decline route
// router.put("/friends-request/:id/decline", declineFriendRequest);

export default router;
