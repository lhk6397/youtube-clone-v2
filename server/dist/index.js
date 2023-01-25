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
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const db_1 = __importDefault(require("./db"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const video_routes_1 = __importDefault(require("./routes/video.routes"));
const view_routes_1 = __importDefault(require("./routes/view.routes"));
const subscribe_routes_1 = __importDefault(require("./routes/subscribe.routes"));
const comment_routes_1 = __importDefault(require("./routes/comment.routes"));
const like_routes_1 = __importDefault(require("./routes/like.routes"));
const config = require("./config/key");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
require("dotenv").config();
app.use(express_1.default.static(__dirname + "/build"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
const store = new connect_mongo_1.default({
    mongoUrl: config.mongoURI,
    touchAfter: 24 * 60 * 60,
});
app.use((0, express_session_1.default)({
    secret: process.env.COOKIE_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false,
    },
}));
app.use("/api/user", user_routes_1.default);
app.use("/api/video", video_routes_1.default);
app.use("/api/view", view_routes_1.default);
app.use("/api/subscribe", subscribe_routes_1.default);
app.use("/api/comment", comment_routes_1.default);
app.use("/api/like", like_routes_1.default);
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/build/index.html");
});
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Listening on port ${PORT}!`);
    yield (0, db_1.default)();
}));
