"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware = (req, res, next) => {
    if (!req.session.loggedInUser) {
        return res.json({ isAuth: false, error: true });
    }
    next();
};
exports.default = authMiddleware;
