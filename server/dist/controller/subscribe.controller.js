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
exports.getSubscribedUser = exports.unsubscribe = exports.subscribe = exports.getSubscribedInfo = exports.getSubscribeNumber = void 0;
const Subscriber_1 = __importDefault(require("../models/Subscriber"));
const User_1 = __importDefault(require("../models/User"));
const getSubscribeNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscribe = yield Subscriber_1.default.find({ userTo: req.body.userTo });
        return res
            .status(200)
            .json({ success: true, subscribeNumber: subscribe.length });
    }
    catch (err) {
        return res.status(400).send(err);
    }
});
exports.getSubscribeNumber = getSubscribeNumber;
const getSubscribedInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = false;
        const subscribe = yield Subscriber_1.default.find({
            userTo: req.body.userTo,
            userFrom: req.body.userFrom,
        });
        if (subscribe.length !== 0)
            result = true;
        return res.status(200).json({ success: true, subscribed: result });
    }
    catch (err) {
        return res.status(400).send(err);
    }
});
exports.getSubscribedInfo = getSubscribedInfo;
const subscribe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscribe = new Subscriber_1.default(req.body);
        yield subscribe.save();
        return res.status(200).json({ success: true });
    }
    catch (err) {
        return res.json({ success: false, err });
    }
});
exports.subscribe = subscribe;
const unsubscribe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Subscriber_1.default.findOneAndDelete({
            userTo: req.body.userTo,
            userFrom: req.body.userFrom,
        });
        return res.status(200).json({ success: true });
    }
    catch (err) {
        return res.status(400).json({ success: false, err });
    }
});
exports.unsubscribe = unsubscribe;
const getSubscribedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscribers = yield Subscriber_1.default.find({ userFrom: req.body.userFrom });
        let subscribedUserId = [];
        subscribers.map((subscriber, i) => {
            subscribedUserId.push(subscriber.userTo);
        });
        const subscribedUser = yield User_1.default.find({ _id: { $in: subscribedUserId } });
        return res.status(200).json({ success: true, subscribedUser });
    }
    catch (err) {
        return res.status(400).json({ success: false, err });
    }
});
exports.getSubscribedUser = getSubscribedUser;
