"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dislikeSchema = new mongoose_1.Schema({
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
const Dislike = (0, mongoose_1.model)("Dislike", dislikeSchema);
exports.default = Dislike;
