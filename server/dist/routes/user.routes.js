"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const user_controller_1 = require("../controller/user.controller");
const imageMulter_1 = __importDefault(require("../middleware/imageMulter"));
const router = express_1.default.Router();
router.post("/register", user_controller_1.register);
router.post("/login", user_controller_1.login);
router.get("/auth", authMiddleware_1.default, user_controller_1.auth);
router.get("/logout", user_controller_1.logout);
router.post("/getUserProfile", user_controller_1.getUserProfile);
router.post("/changePassword", user_controller_1.changePassword);
router.post("/profile");
router.post("/uploadProfileImage", imageMulter_1.default.single("file"), user_controller_1.uploadProfileImage);
router.post("/updateProfileImage", user_controller_1.updateProfileImage);
exports.default = router;