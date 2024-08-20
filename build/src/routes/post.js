"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PostController_1 = require("../controllers/PostController");
const verifyJWT_1 = require("../middlewares/verifyJWT");
const router = (0, express_1.Router)();
router.route("/")
    .get(PostController_1.getAllPosts)
    .post(verifyJWT_1.verifyJWT, PostController_1.createPost);
router.route("/like")
    .post(verifyJWT_1.verifyJWT, PostController_1.likePost);
exports.default = router;
