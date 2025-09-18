import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  getProfilePosts,
  getNotificationsNumber
} from "../controllers/user.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/user", verifyToken, getUser);
router.get("/profilePosts", verifyToken, getProfilePosts);
router.put("/user", verifyToken, updateUser);
router.delete("/user", verifyToken, deleteUser);
router.get("/notifications", verifyToken, getNotificationsNumber);

export default router;
