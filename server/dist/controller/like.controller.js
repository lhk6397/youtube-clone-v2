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
exports.unDislike = exports.upDislike = exports.unLike = exports.upLike = exports.getDislikes = exports.getLikes = void 0;
const Dislike_1 = __importDefault(require("../models/Dislike"));
const Like_1 = __importDefault(require("../models/Like"));
const getLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let variable = {};
        if (req.body.videoId) {
            variable = { videoId: req.body.videoId };
        }
        else {
            variable = { commentId: req.body.commentId };
        }
        const likes = yield Like_1.default.find(variable);
        return res.status(200).json({ success: true, likes });
    }
    catch (err) {
        return res.status(400).send(err);
    }
});
exports.getLikes = getLikes;
const getDislikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let variable = {};
        if (req.body.videoId) {
            variable = { videoId: req.body.videoId };
        }
        else {
            variable = { commentId: req.body.commentId };
        }
        const dislikes = yield Dislike_1.default.find(variable);
        return res.status(200).json({ success: true, dislikes });
    }
    catch (err) {
        return res.status(400).send(err);
    }
});
exports.getDislikes = getDislikes;
const upLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let variable = {};
        if (req.body.videoId) {
            variable = { videoId: req.body.videoId, userId: req.body.userId };
        }
        else {
            variable = { commentId: req.body.commentId, userId: req.body.userId };
        }
        const like = new Like_1.default(variable);
        // save the like info data in MongoDB
        yield like.save();
        // In case dislike button is already cliked, we need to decrease the dislike by 1
        yield Dislike_1.default.findOneAndDelete(variable);
        return res.status(200).json({ success: true });
    }
    catch (err) {
        return res.status(400).json({ success: false, err });
    }
});
exports.upLike = upLike;
const unLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let variable = {};
        if (req.body.videoId) {
            variable = { videoId: req.body.videoId, userId: req.body.userId };
        }
        else {
            variable = { commentId: req.body.commentId, userId: req.body.userId };
        }
        yield Like_1.default.findOneAndDelete(variable);
        return res.status(200).json({ success: true });
    }
    catch (err) {
        return res.status(400).json({ success: false, err });
    }
});
exports.unLike = unLike;
const upDislike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let variable = {};
        if (req.body.videoId) {
            variable = { videoId: req.body.videoId, userId: req.body.userId };
        }
        else {
            variable = { commentId: req.body.commentId, userId: req.body.userId };
        }
        const disLike = new Dislike_1.default(variable);
        // save the like info data in MongoDB
        yield disLike.save();
        // In case dislike button is already cliked, we need to decrease the like by 1
        yield Like_1.default.findOneAndDelete(variable);
        return res.status(200).json({ success: true });
    }
    catch (err) {
        return res.status(400).json({ success: false, err });
    }
});
exports.upDislike = upDislike;
const unDislike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let variable = {};
        if (req.body.videoId) {
            variable = { videoId: req.body.videoId, userId: req.body.userId };
        }
        else {
            variable = { commentId: req.body.commentId, userId: req.body.userId };
        }
        yield Dislike_1.default.findOneAndDelete(variable);
        return res.status(200).json({ success: true });
    }
    catch (err) {
        return res.status(400).json({ success: false, err });
    }
});
exports.unDislike = unDislike;
