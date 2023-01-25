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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageToCLD = exports.uploadVideoToCLD = void 0;
const cloudinary_1 = require("cloudinary");
require("dotenv").config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
const uploadVideoToCLD = (file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cloudinary_1.v2.uploader.upload(file, {
            folder: "YoutubeClone/video",
            resource_type: "video",
            use_filename: true,
            unique_filename: true,
        });
        return {
            path: result.url,
            duration: result.duration,
            publicId: result.public_id,
        };
    }
    catch (error) {
        console.error(error);
    }
});
exports.uploadVideoToCLD = uploadVideoToCLD;
const uploadImageToCLD = (file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Upload the image
        const result = yield cloudinary_1.v2.uploader.upload(file, {
            folder: "YoutubeClone/profileImage",
            resource_type: "image",
            use_filename: true,
            unique_filename: true,
        });
        return {
            path: result.url,
            publicId: result.public_id,
        };
    }
    catch (error) {
        console.error(error);
    }
});
exports.uploadImageToCLD = uploadImageToCLD;
