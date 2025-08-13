import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getUsersForSidebar,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";
import makeUploader from "../lib/uploader.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);

router.get("/:id", protectRoute, getMessages);
router.post(
  "/send/:id",
  protectRoute,
  makeUploader("chatImages").single("chatImage"),
  sendMessage
);

export default router;
