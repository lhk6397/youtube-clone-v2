"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearchedVideos = exports.getCategorizedVideos = exports.deleteVideo = exports.getLikedVideo = exports.getWatchedVideos = exports.getUserVideos = exports.getSubscriptionVideos = exports.getVideo = exports.getVideos = exports.updateVideo = exports.uploadVideo = exports.uploadFiles = void 0;
const Video_1 = __importDefault(require("../models/Video"));
const Subscriber_1 = __importDefault(require("../models/Subscriber"));
const View_1 = __importDefault(require("../models/View"));
const Like_1 = __importDefault(require("../models/Like"));
const Comment_1 = __importDefault(require("../models/Comment"));
const Dislike_1 = __importDefault(require("../models/Dislike"));
const User_1 = __importDefault(require("../models/User"));
const cloudinary_1 = require("../middleware/cloudinary");
const cloudinary_2 = require("cloudinary");
const uploadFiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = yield (0, cloudinary_1.uploadVideoToCLD)(dataURI);
        if (cldRes) {
            const thumbnail = cloudinary_2.v2.url(cldRes.publicId + ".jpg", {
                resource_type: "video",
                transformation: { height: 240, width: 320, crop: "fill" },
            });
            return res.json({
                success: true,
                filePath: cldRes.path,
                fileName: cldRes.publicId,
                thumbnail,
                duration: cldRes.duration,
            });
        }
    }
    return res.json({ success: false });
});
exports.uploadFiles = uploadFiles;
const uploadVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = new Video_1.default(req.body);
        yield video.save();
        return res.status(200).json({
            success: true,
        });
    }
    catch (err) {
        return res.status(400).json({ success: false, err });
    }
});
exports.uploadVideo = uploadVideo;
const updateVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, privacy, filePath, category, duration, thumbnail, } = req.body;
        yield Video_1.default.findByIdAndUpdate(req.body.videoId, {
            title,
            description,
            privacy,
            filePath,
            category,
            duration,
            thumbnail,
        }, { new: true });
        return res.status(200).json({
            success: true,
        });
    }
    catch (err) {
        return res.status(400).json({ success: false, err });
    }
});
exports.updateVideo = updateVideo;
const getVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield Video_1.default.find().populate("writer");
        return res.status(200).json({ success: true, videos });
    }
    catch (error) {
        return res.status(400).send(error);
    }
});
exports.getVideos = getVideos;
const getVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = yield Video_1.default.findOne({ _id: req.body.videoId }).populate("writer");
        return res.status(200).json({ success: true, video });
    }
    catch (error) {
        return res.status(400).send(error);
    }
});
exports.getVideo = getVideo;
const getSubscriptionVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Need to find all of the Users that I am subscribing to From Subscriber Collection
        const subscribers = yield Subscriber_1.default.find({ userFrom: req.body.userFrom });
        let subscribedUser = [];
        subscribers.map((subscriber, i) => {
            subscribedUser.push(subscriber.userTo);
        });
        //Need to Fetch all of the Videos that belong to the Users that I found in previous step.
        const videos = yield Video_1.default.find({
            writer: { $in: subscribedUser },
        }).populate("writer");
        return res.status(200).json({ success: true, videos });
    }
    catch (err) {
        return res.status(400).send(err);
    }
});
exports.getSubscriptionVideos = getSubscriptionVideos;
const getUserVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Need to find all of the Users that I am subscribing to From Subscriber Collection
        const videos = yield Video_1.default.find({ writer: req.body.userId }).populate("writer");
        return res.status(200).json({ success: true, videos });
    }
    catch (err) {
        return res.status(400).send(err);
    }
});
exports.getUserVideos = getUserVideos;
const getWatchedVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let uniqueViews = [];
        yield View_1.default.aggregate([
            {
                $group: { _id: "$userId", watchedVideos: { $addToSet: "$videoId" } },
            },
        ], function (rr, ra) {
            if (ra) {
                for (let i = 0; i < ra.length; i++) {
                    if (ra[i]._id == req.body.userId) {
                        uniqueViews = ra[i].watchedVideos;
                    }
                }
            }
        });
        const videos = yield Video_1.default.find({
            _id: { $in: uniqueViews },
        }).populate("writer");
        return res.status(200).json({ success: true, videos });
    }
    catch (err) {
        return res.status(400).send(err);
    }
});
exports.getWatchedVideos = getWatchedVideos;
const getLikedVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const likes = yield Like_1.default.find({
            userId: req.body.userId,
            videoId: { $ne: null },
        });
        const likedVideos = [];
        likes.map((like) => likedVideos.push(like.videoId));
        const videos = yield Video_1.default.find({
            _id: { $in: likedVideos },
        }).populate("writer");
        return res.status(200).json({ success: true, videos });
    }
    catch (err) {
        return res.status(400).send(err);
    }
});
exports.getLikedVideo = getLikedVideo;
const deleteVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { videoId, fileName } = req.body;
        yield cloudinary_2.v2.uploader.destroy(fileName, {
            invalidate: true,
            resource_type: "video",
        });
        yield Video_1.default.findByIdAndDelete(videoId);
        // Comments, Likes, views 삭제
        const comments = yield Comment_1.default.find({ videoId });
        yield Comment_1.default.deleteMany({ videoId });
        let commentIdx = [];
        comments.map((comment, i) => {
            commentIdx.push(comment._id);
        });
        yield Like_1.default.deleteMany({
            $or: [{ videoId }, { commentId: { $in: commentIdx } }],
        });
        yield Dislike_1.default.deleteMany({
            $or: [{ videoId }, { commentId: { $in: commentIdx } }],
        });
        yield View_1.default.deleteMany({ videoId });
        return res.status(200).json({ success: true });
    }
    catch (err) {
        return res.status(400).send(err);
    }
});
exports.deleteVideo = deleteVideo;
const getCategorizedVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categorizedVideos = yield Video_1.default.find({
            category: req.body.category,
        }).populate("writer");
        return res.status(200).json({ success: true, categorizedVideos });
    }
    catch (err) {
        return res.status(400).send(err);
    }
});
exports.getCategorizedVideos = getCategorizedVideos;
const getSearchedVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const regex = new RegExp(req.body.search, "i");
        let userIds = [];
        const users = yield User_1.default.find({ username: { $regex: regex } });
        users.map((user) => {
            userIds.push(user._id);
        });
        const searchedVideos = yield Video_1.default.find({
            $or: [
                { title: { $regex: regex } },
                { description: { $regex: regex } },
                { writer: { $in: userIds } },
            ],
        }).populate("writer");
        return res.status(200).json({ success: true, searchedVideos });
    }
    catch (err) {
        return res.status(400).send(err);
    }
});
exports.getSearchedVideos = getSearchedVideos;
