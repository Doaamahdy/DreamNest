import express from "express";
import {
  createPost,
  getPost,
  deletePost,
  updatePost,
  getPosts,
  savePost,
} from "../controllers/post.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", verifyToken, createPost);
router.get("/:id", verifyToken, getPost);
router.delete("/:id", verifyToken, deletePost);
router.put("/:id", verifyToken, updatePost);
router.post('/save',verifyToken,savePost)
export default router;
