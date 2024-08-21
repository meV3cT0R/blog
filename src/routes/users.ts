import { createUser, deleteUser, findById, getAccessToken, getAllPostByUser, getAllUsers, loginUser, updateUser } from "../controllers/UserController";
import { verifyJWT } from "../middlewares/verifyJWT";
import { verifyAuthorized } from "../middlewares/verifyAuthorized";
import { Router } from "express";



export const userRouteHandler = (router : Router)=> {
        router.route("/users")
        router.route("/users")
        .get(getAllUsers)
        .post(createUser)
        .put(verifyJWT,verifyAuthorized,updateUser)
        .delete(verifyJWT,verifyAuthorized,deleteUser);

        router.route("/users/:id")
                .get(findById)

        router.route("/users/posts/:username")
                .get(getAllPostByUser)
        router.route("/users/login")
                .post(loginUser)

        router.route("/users/refresh")
                .post(getAccessToken)
}

        
