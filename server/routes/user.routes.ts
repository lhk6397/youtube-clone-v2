import { UserDocument } from "../models/User";
import express, { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { register, login, auth, logout } from "../controller/user.controller";

const router: Router = express.Router();

declare module "express-session" {
  interface SessionData {
    loggedInUser: UserDocument;
    isLoggedIn: boolean;
  }
}

router.post("/register", register);

router.post("/login", login);

router.get("/auth", authMiddleware, auth);

router.get("/logout", logout);

export default router;
