import {Router} from "express";
import { createUser, deleteUser, findById, getAccessToken, getAllPostByUser, getAllUsers, loginUser, updateUser } from "../controllers/UserController";
import { verifyJWT } from "../middlewares/verifyJWT";
import { verifyAuthorized } from "../middlewares/verifyAuthorized";

const router = Router();

router.route("/")
        .get(getAllUsers)
        .post(createUser)
        .put(verifyJWT,verifyAuthorized,updateUser)
        .delete(verifyJWT,verifyAuthorized,deleteUser);

router.route("/:id")
        .get(findById)

router.route("posts/:username")
        .get(getAllPostByUser)
router.route("/login")
        .post(loginUser)

router.route("/refresh")
        .post(getAccessToken)
        
        
export default router;