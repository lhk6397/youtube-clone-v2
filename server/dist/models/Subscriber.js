"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const subscriberSchema = new mongoose_1.Schema({
    userTo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    userFrom: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });
const Subscriber = (0, mongoose_1.model)("Subscriber", subscriberSchema);
exports.default = Subscriber;
