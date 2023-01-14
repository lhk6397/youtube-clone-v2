import { UserDocument } from "../models/User";
import express, { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import {
  register,
  login,
  auth,
  logout,
  getUserProfile,
} from "../controller/user.controller";

const router: Router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/auth", authMiddleware, auth);

router.get("/logout", logout);

router.post("/getUserProfile", getUserProfile);

export default router;
