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
exports.likePost = exports.createPost = exports.getAllPosts = void 0;
const Post_1 = require("../models/Post");
const User_1 = require("../models/User");
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield Post_1.Post.find({});
    res.status(200).json({
        data: {
            posts
        }
    });
});
exports.getAllPosts = getAllPosts;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, username } = req.body;
    if (!title || !content || !username)
        return res.status(400).json({
            error: "Title,content,username Are all required"
        });
    const user = yield User_1.User.findOne({ username }).exec();
    if (!user)
        return res.status(404).json({
            error: "Something Horribly Went Wrong!!"
        });
    yield Post_1.Post.create({
        title, content, postedBy: user
    });
    const posts = yield Post_1.Post.find({});
    res.status(201).json({
        data: {
            posts
        }
    });
});
exports.createPost = createPost;
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, username } = req.body;
    if (!postId || !username) {
        return res.status(400).json({
            error: "post id and username are both required field"
        });
    }
    const user = yield User_1.User.findOne({ username }).exec();
    const post = yield Post_1.Post.findOne({ _id: postId }).exec();
    if (!post) {
        return res.status(404).json({
            error: `Post with given id ${postId} not found`
        });
    }
    if (!user) {
        return res.status(404).json({
            error: "Something horribly went wrong"
        });
    }
    const alreadyLiked = post.likedBy.find(u => {
        console.log(`${u.id} == ${user.id}`);
        return true;
    });
    console.log(user._id);
    let likedBy = [];
    if (alreadyLiked) {
        likedBy = post.likedBy.filter(u => u._id == user._id);
    }
    else {
        user.liked.push(post);
        yield user.save();
        post.likedBy.push(user);
        yield post.save();
    }
    return res.status(200).json({
        data: {
            post
        }
    });
});
exports.likePost = likePost;
