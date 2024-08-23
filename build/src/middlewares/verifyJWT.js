"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJWT = (req, res, next) => {
    const authHeader = (req.headers.authorization || req.headers.Authorization);
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer ")))
        return res.sendStatus(403);
    if (process.env.ACCESS_TOKEN_SECRET) {
        jsonwebtoken_1.default.verify(authHeader.split(" ")[1], process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            var _a;
            let valid = true;
            const actUsername = decoded.username;
            if (!actUsername)
                return res.sendStatus(403);
            if ((_a = req.body) === null || _a === void 0 ? void 0 : _a.username)
                valid = req.body.username == actUsername;
            if (err || !valid)
                return res.sendStatus(403);
            next();
        });
    }
    else {
        return res.sendStatus(500);
    }
};
exports.verifyJWT = verifyJWT;
