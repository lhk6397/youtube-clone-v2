"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const likeSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    commentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Comment",
    },
    videoId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "video",
    },
}, { timestamps: true });
const Like = (0, mongoose_1.model)("Like", likeSchema);
exports.default = Like;
