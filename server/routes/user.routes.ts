import { UserDocument } from "../models/User";
import express, { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import {
  register,
  login,
  auth,
  logout,
  getUserProfile,
  changePassword,
} from "../controller/user.controller";

const router: Router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/auth", authMiddleware, auth);
router.get("/logout", logout);
router.post("/getUserProfile", getUserProfile);
router.post("/changePassword", changePassword);

export default router;
