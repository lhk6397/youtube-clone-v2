"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const like_controller_1 = require("../controller/like.controller");
const router = express_1.default.Router();
router.post("/getLikes", like_controller_1.getLikes);
router.post("/getDislikes", like_controller_1.getDislikes);
router.post("/upLike", like_controller_1.upLike);
router.post("/unLike", like_controller_1.unLike);
router.post("/upDisLike", like_controller_1.upDislike);
router.post("/unDisLike", like_controller_1.unDislike);
exports.default = router;
