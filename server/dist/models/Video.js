"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const videoSchema = new mongoose_1.Schema({
    writer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        maxlength: 50,
    },
    description: {
        type: String,
    },
    privacy: {
        type: String,
    },
    filePath: {
        type: String,
    },
    category: String,
    duration: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    createdAt: {
        type: Number,
        default: () => Date.now(),
    },
    fileName: String,
});
const Video = (0, mongoose_1.model)("Video", videoSchema);
exports.default = Video;
