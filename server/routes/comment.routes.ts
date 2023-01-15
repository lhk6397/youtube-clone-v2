import express, { Router } from "express";
import { getComments, saveComment } from "../controller/comment.controller";

const router: Router = express.Router();

router.post("/saveComment", saveComment);
router.post("/getComments", getComments);

export default router;
