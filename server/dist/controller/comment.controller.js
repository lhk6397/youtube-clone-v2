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
exports.updateComment = exports.deleteComment = exports.getComments = exports.saveComment = void 0;
const Comment_1 = __importDefault(require("../models/Comment"));
const saveComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = new Comment_1.default(req.body);
        yield comment.save();
        const foundComment = yield Comment_1.default.find({ _id: comment._id }).populate("writer");
        return res.status(200).json({ success: true, foundComment });
    }
    catch (err) {
        return res.status(400).send(err);
    }
});
exports.saveComment = saveComment;
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield Comment_1.default.find({ videoId: req.body.videoId }).populate("writer");
        return res.status(200).json({ success: true, comments });
    }
    catch (err) {
        return res.status(400).json({ success: false, err });
    }
});
exports.getComments = getComments;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Comment_1.default.findOneAndDelete({ _id: req.body._id });
        yield Comment_1.default.deleteMany({ responseTo: req.body._id });
        return res.json({ success: true });
    }
    catch (err) {
        return res.json({ success: false, err });
    }
});
exports.deleteComment = deleteComment;
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedComment = yield Comment_1.default.findOneAndUpdate({ _id: req.body.commentId }, { content: req.body.content }, { new: true });
        return res.json({ success: true, updatedComment });
    }
    catch (err) {
        return res.json({ success: false, err });
    }
});
exports.updateComment = updateComment;
