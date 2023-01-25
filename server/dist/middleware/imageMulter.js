"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
// type DestinationCallback = (error: Error | null, destination: string) => void;
// type FileNameCallback = (error: Error | null, filename: string) => void;
// const storage = multer.diskStorage({
//   destination: (
//     req: Request,
//     file: Express.Multer.File,
//     cb: DestinationCallback
//   ): void => {
//     cb(null, "uploads/profileImage/");
//   },
//   filename: (
//     req: Request,
//     file: Express.Multer.File,
//     cb: FileNameCallback
//   ): void => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, `${uniqueSuffix}_${file.originalname}`);
//   },
// });
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
});
exports.default = upload;
