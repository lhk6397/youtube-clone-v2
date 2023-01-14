import express, { Router } from "express";
import {
  uploadFiles,
  getThumbnail,
  uploadVideo,
  getVideos,
  getVideo,
  getSubscriptionVideos,
} from "../controller/video.controller";
import upload from "../middleware/multer";

const router: Router = express.Router();

router.post("/uploadfiles", upload.single("file"), uploadFiles);

router.post("/thumbnail", getThumbnail);

router.post("/uploadVideo", uploadVideo);

router.get("/getVideos", getVideos);

router.post("/getVideo", getVideo);

router.post("/getSubscriptionVideos", getSubscriptionVideos);

export default router;
