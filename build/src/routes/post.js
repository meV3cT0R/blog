"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouteHandler = void 0;
const PostController_1 = require("../controllers/PostController");
const verifyJWT_1 = require("../middlewares/verifyJWT");
const postRouteHandler = (router) => {
    router.route("/posts")
        .get(PostController_1.getAllPosts)
        .post(verifyJWT_1.verifyJWT, PostController_1.createPost);
    router.route("/posts/like")
        .post(verifyJWT_1.verifyJWT, PostController_1.likePost);
};
exports.postRouteHandler = postRouteHandler;
