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
exports.getAccessToken = exports.getAllPostByUser = exports.loginUser = exports.findById = exports.deleteUser = exports.updateUser = exports.createUser = exports.getAllUsers = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.User.find({});
    return res.status(200).json({
        data: {
            users
        }
    });
});
exports.getAllUsers = getAllUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, username, password } = req.body;
    if (!firstName || !lastName || !username || !password) {
        return res.status(400).json({
            error: "All Fields are required"
        });
    }
    const found = yield User_1.User.findOne({ username }).exec();
    if (found) {
        return res.status(409).json({
            error: `User with username ${username} already exists!`
        });
    }
    const hashedPwd = yield bcrypt_1.default.hash(password, 10);
    const user = {
        firstName, lastName, username, password: hashedPwd
    };
    yield User_1.User.create(user);
    res.status(201).json({
        data: {
            user
        }
    });
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ObjectId } = req.body;
    if (!ObjectId)
        return res.status(400).json({
            error: "ObjectId is missing"
        });
    const user = yield User_1.User.findOne({ ObjectId: ObjectId }).exec();
    if (!user) {
        res.status(404).json({
            error: `User with ${ObjectId} not found`
        });
    }
    const newUser = yield User_1.User.findOneAndUpdate({ ObjectId }, Object.assign(Object.assign({}, user), ObjectId), {
        new: true
    });
    res.status(200).json({
        data: {
            user: newUser
        }
    });
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ObjectId } = req.body;
    if (!ObjectId)
        return res.json({
            error: "ObjectId is required"
        });
    const user = yield User_1.User.findOne({ _id: ObjectId }).exec();
    if (!user)
        return res.status(404).json({
            error: `User with ObjectId ${ObjectId} not found`
        });
    yield User_1.User.deleteOne({ _id: ObjectId });
    return res.status(200).json({
        data: {
            user
        }
    });
});
exports.deleteUser = deleteUser;
const findById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ObjectId = req.body.id;
    if (!ObjectId)
        return res.json({
            error: "ObjectId is required"
        });
    const user = yield User_1.User.findOne({ ObjectId }).exec();
    if (!user)
        return res.status(404).json({
            error: `User with ObjectId ${ObjectId} not found`
        });
    return res.status(200).json({
        data: {
            user
        }
    });
});
exports.findById = findById;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            error: "username/password invalid"
        });
    }
    const user = yield User_1.User.findOne({ username }).exec();
    if (!user)
        return res.status(400).json({
            error: `username/password invalid`
        });
    const allowed = yield bcrypt_1.default.compare(password, user.password);
    if (!allowed)
        return res.status(400).json({
            error: `username/password invalid`
        });
    if (process.env.ACCESS_TOKEN_SECRET && process.env.REFRESH_TOKEN_SECRET) {
        const accessToken = jsonwebtoken_1.default.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "60s"
        });
        const refreshToken = jsonwebtoken_1.default.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "60s"
        });
        yield User_1.User.findOneAndUpdate({ username }, Object.assign(Object.assign({}, user), { refreshToken }));
        res.cookie("jwt", refreshToken, {
            maxAge: 24 * 60 * 60,
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        return res.status(200).json({
            data: {
                username: user.username,
                accessToken: accessToken
            }
        });
    }
    return res.status(400).json({
        error: "Something Horribly Went wrong"
    });
});
exports.loginUser = loginUser;
const getAllPostByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    if (!username)
        return res.json({
            error: "Nigga what?"
        });
    const user = yield User_1.User.findOne({ username }).exec();
    if (!user)
        return res.json({
            error: "Seriously nigga?"
        });
    res.json({
        data: {
            posts: user.posts
        }
    });
});
exports.getAllPostByUser = getAllPostByUser;
const getAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies["jwt"];
    if (!refreshToken)
        return res.sendStatus(400);
    const user = yield User_1.User.findOne({ refreshToken }).exec();
    if (!user)
        return res.sendStatus(400);
    if (!process.env.REFRESH_TOKEN_SECRET)
        return res.sendStatus(500);
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || decoded.username)
            res.sendStatus(403);
        if (!process.env.ACCESS_TOKEN_SECRET)
            return res.sendStatus(500);
        const accessToken = jsonwebtoken_1.default.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "30s"
        });
        res.json({
            username: user.username,
            accessToken
        });
    });
});
exports.getAccessToken = getAccessToken;
