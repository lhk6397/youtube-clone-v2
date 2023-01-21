import express, { Router } from "express";
import {
  uploadFiles,
  getThumbnail,
  uploadVideo,
  getVideos,
  getVideo,
  getSubscriptionVideos,
  getUserVideos,
  getWatchedVideos,
  getLikedVideo,
  updateVideo,
} from "../controller/video.controller";
import upload from "../middleware/videoMulter";

const router: Router = express.Router();

router.post("/uploadfiles", upload.single("file"), uploadFiles);
router.post("/thumbnail", getThumbnail);
router.post("/uploadVideo", uploadVideo);
router.post("/updateVideo", updateVideo);
router.get("/getVideos", getVideos);
router.post("/getVideo", getVideo);
router.post("/getSubscriptionVideos", getSubscriptionVideos);
router.post("/getWatchedVideos", getWatchedVideos);
router.post("/getUserVideos", getUserVideos);
router.post("/getLikedVideo", getLikedVideo);

export default router;
