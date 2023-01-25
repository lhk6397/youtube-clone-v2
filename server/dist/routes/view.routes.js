"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const view_controller_1 = require("../controller/view.controller");
const router = express_1.default.Router();
router.post("/getViews", view_controller_1.getViews);
router.post("/updateView", view_controller_1.updateView);
exports.default = router;
