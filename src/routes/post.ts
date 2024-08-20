import { Router } from "express";
import { createPost, getAllPosts, likePost } from "../controllers/PostController";
import { verifyJWT } from "../middlewares/verifyJWT";

const router = Router();

router.route("/")
        .get(getAllPosts)
        .post(verifyJWT,createPost)

router.route("/like")
        .post(verifyJWT,likePost)

export default router;