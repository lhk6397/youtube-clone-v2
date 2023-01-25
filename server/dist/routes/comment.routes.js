"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("../controller/comment.controller");
const router = express_1.default.Router();
router.post("/saveComment", comment_controller_1.saveComment);
router.post("/getComments", comment_controller_1.getComments);
router.post("/deleteComment", comment_controller_1.deleteComment);
router.post("/updateComment", comment_controller_1.updateComment);
exports.default = router;
