"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const fileFilter = (req, file, cb) => {
    if (file.mimetype !== "video/mp4") {
        return cb(null, false);
    }
    cb(null, true);
};
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    fileFilter: fileFilter,
});
exports.default = upload;
