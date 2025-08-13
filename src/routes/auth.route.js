import express from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import makeUploader from "../lib/uploader.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put(
  "/update-profile",
  protectRoute,
  makeUploader("members").single("memberImage"),
  updateProfile
);

router.get("/check", protectRoute, checkAuth);

export default router;
