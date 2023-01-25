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
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = __importDefault(require("../db"));
const Comment_1 = __importDefault(require("../models/Comment"));
const Dislike_1 = __importDefault(require("../models/Dislike"));
const Like_1 = __importDefault(require("../models/Like"));
const Subscriber_1 = __importDefault(require("../models/Subscriber"));
const User_1 = __importDefault(require("../models/User"));
const Video_1 = __importDefault(require("../models/Video"));
const View_1 = __importDefault(require("../models/View"));
const seedDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.default)();
    yield User_1.default.deleteMany({});
    yield Video_1.default.deleteMany({});
    yield View_1.default.deleteMany({});
    yield Subscriber_1.default.deleteMany({});
    yield Comment_1.default.deleteMany({});
    yield Like_1.default.deleteMany({});
    yield Dislike_1.default.deleteMany({});
});
seedDB().then(() => {
    mongoose_1.default.connection.close();
});
