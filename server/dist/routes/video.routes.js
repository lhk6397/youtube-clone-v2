"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const video_controller_1 = require("../controller/video.controller");
// import upload from "../middleware/videoMulter";
const videoMulter_1 = __importDefault(require("../middleware/videoMulter"));
const router = express_1.default.Router();
router.post("/uploadfiles", videoMulter_1.default.single("file"), video_controller_1.uploadFiles);
router.post("/uploadVideo", video_controller_1.uploadVideo);
router.post("/updateVideo", video_controller_1.updateVideo);
router.post("/deleteVideo", video_controller_1.deleteVideo);
router.get("/getVideos", video_controller_1.getVideos);
router.post("/getVideo", video_controller_1.getVideo);
router.post("/getSubscriptionVideos", video_controller_1.getSubscriptionVideos);
router.post("/getWatchedVideos", video_controller_1.getWatchedVideos);
router.post("/getUserVideos", video_controller_1.getUserVideos);
router.post("/getLikedVideo", video_controller_1.getLikedVideo);
router.post("/getCategorizedVideos", video_controller_1.getCategorizedVideos);
router.post("/getSearchedVideos", video_controller_1.getSearchedVideos);
exports.default = router;