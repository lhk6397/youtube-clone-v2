"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    writer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    videoId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Video",
    },
    responseTo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Comment",
    },
    content: {
        type: String,
    },
    createdAt: {
        type: Number,
        default: () => Date.now(),
    },
});
const Comment = (0, mongoose_1.model)("Comment", commentSchema);
exports.default = Comment;
