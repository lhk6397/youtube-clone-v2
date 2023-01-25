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
exports.updateProfileImage = exports.uploadProfileImage = exports.changePassword = exports.getUserProfile = exports.logout = exports.auth = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
require("express-session");
const cloudinary_1 = require("../middleware/cloudinary");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, confirmPassword } = req.body;
        const existingUser = yield User_1.default.exists({
            $or: [{ username }, { email }],
        });
        if (existingUser) {
            // req.flash("fail", "이미 존재하는 이름 또는 이메일입니다.");
            return res.status(200).json({
                registerSuccess: false,
                errorMessage: "이미 존재하는 이름 또는 이메일입니다.",
            });
        }
        const user = yield User_1.default.create({
            username,
            email,
            password,
            avatarUrl: "https://res.cloudinary.com/dhtb9zwz6/image/upload/v1674657033/YoutubeClone/profileImage/defaultProfileImage_voz8ay.png",
        });
        req.session.loggedInUser = user;
        req.session.isLoggedIn = true;
        // req.flash("success", `반갑습니다, ${req.session.loggedInUser.username}님`);
        return res.status(200).json({
            success: true,
            userId: user._id,
        });
    }
    catch (error) {
        // req.flash("fail", "회원가입에 실패하였습니다.");
        return res.status(200).json({
            registerSuccess: false,
            message: "회원가입에 실패하였습니다.",
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const foundUser = yield User_1.default.findOne({ email });
        if (!foundUser)
            return res.status(200).json({
                loginSuccess: false,
                message: "이메일에 해당하는 유저가 없습니다.",
            });
        const isMatch = yield bcrypt_1.default.compare(password, foundUser.password);
        if (!isMatch) {
            console.log("비밀번호 오류");
            // req.flash("error", "비밀번호가 일치하지 않습니다.");
            return res.status(200).json({
                loginSuccess: false,
                message: "비밀번호가 일치하지 않습니다.",
            });
        }
        req.session.loggedInUser = foundUser;
        req.session.isLoggedIn = true;
        // req.flash("success", `반갑습니다, ${req.session.loggedInUser.username}님`);
        return res.status(200).json({
            loginSuccess: true,
            userId: foundUser._id,
        });
    }
    catch (error) {
        // req.flash("fail", "로그인에 실패하였습니다.");
        return res.status(200).json({
            loginSuccess: false,
            message: "로그인에 실패하였습니다.",
        });
    }
});
exports.login = login;
const auth = (req, res) => {
    var _a;
    const user = (_a = req.session) === null || _a === void 0 ? void 0 : _a.loggedInUser;
    if (user) {
        return res.status(200).json({
            _id: user._id,
            isAdmin: user.role === 0 ? false : true,
            isAuth: true,
            email: user.email,
            username: user.username,
            role: user.role,
            image: user.avatarUrl,
        });
    }
    return res.json({
        success: false,
    });
};
exports.auth = auth;
const logout = (req, res) => {
    req.session.destroy(() => {
        return res.status(200).json({ success: true });
    });
};
exports.logout = logout;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ _id: req.body.userId });
        return res.status(200).json({
            success: true,
            user,
        });
    }
    catch (err) {
        return res.status(200).send(err);
    }
});
exports.getUserProfile = getUserProfile;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, password, curPassword } = req.body;
        const foundUser = yield User_1.default.findOne({ _id: userId });
        if (foundUser) {
            const isMatch = yield bcrypt_1.default.compare(curPassword, foundUser.password);
            if (isMatch) {
                const hashedPwd = yield bcrypt_1.default.hash(password, 12);
                yield User_1.default.findOneAndUpdate({ _id: userId }, { password: hashedPwd });
                return res.status(200).json({
                    success: true,
                });
            }
            else {
                return res.status(200).json({
                    success: false,
                    message: "현재 비밀번호가 일치하지 않습니다.",
                });
            }
        }
        else {
            return res.status(200).json({
                success: false,
                message: "유저 정보가 없습니다.",
            });
        }
    }
    catch (error) {
        // req.flash("fail", "회원가입에 실패하였습니다.");
        return res.status(200).json({
            success: false,
            message: "비밀번호 변경에 실패하였습니다.",
        });
    }
});
exports.changePassword = changePassword;
const uploadProfileImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = yield (0, cloudinary_1.uploadImageToCLD)(dataURI);
        if (cldRes) {
            return res.json({
                success: true,
                filePath: cldRes.path,
                fileName: cldRes.publicId,
            });
        }
    }
    return res.json({
        success: false,
    });
});
exports.uploadProfileImage = uploadProfileImage;
const updateProfileImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, filePath } = req.body;
        const user = yield User_1.default.findOneAndUpdate({ _id: userId }, { avatarUrl: filePath }, { new: true });
        if (user) {
            req.session.loggedInUser = user;
            return res.status(200).json({
                success: true,
            });
        }
        return res.status(200).json({
            success: false,
        });
    }
    catch (err) {
        return res.status(400).json({ success: false, err });
    }
});
exports.updateProfileImage = updateProfileImage;
