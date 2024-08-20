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
exports.verifyAuthorized = void 0;
const User_1 = require("../models/User");
const verifyAuthorized = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies["jwt"];
    if (!refreshToken)
        return res.sendStatus(400);
    const user = yield User_1.User.findOne({ refreshToken }).exec();
    if (!user)
        return res.sendStatus(404);
    console.log("req.body.postedBy : ", req.body.postedBy.id);
    console.log("user.id : ", user.id);
    if (req.body.postedBy.id != user.id)
        return res.sendStatus(403);
    next();
});
exports.verifyAuthorized = verifyAuthorized;
