"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const viewsSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    videoId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "video",
    },
}, { timestamps: true });
const View = (0, mongoose_1.model)("View", viewsSchema);
exports.default = View;
