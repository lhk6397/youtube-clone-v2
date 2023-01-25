"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subscribe_controller_1 = require("../controller/subscribe.controller");
const router = express_1.default.Router();
router.post("/subscribeNumber", subscribe_controller_1.getSubscribeNumber);
router.post("/subscribed", subscribe_controller_1.getSubscribedInfo);
router.post("/subscribe", subscribe_controller_1.subscribe);
router.post("/unsubscribe", subscribe_controller_1.unsubscribe);
router.post("/getSubscribedUser", subscribe_controller_1.getSubscribedUser);
exports.default = router;
