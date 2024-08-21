import { Router } from "express";
import { createPost, getAllPosts, likePost } from "../controllers/PostController";
import { verifyJWT } from "../middlewares/verifyJWT";


export const postRouteHandler = (router: Router) => {
        router.route("/posts")
                .get(getAllPosts)
                .post(verifyJWT, createPost)

        router.route("/posts/like")
                .post(verifyJWT, likePost)
}

