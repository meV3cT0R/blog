"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouteHandler = void 0;
const UserController_1 = require("../controllers/UserController");
const verifyJWT_1 = require("../middlewares/verifyJWT");
const verifyAuthorized_1 = require("../middlewares/verifyAuthorized");
const userRouteHandler = (router) => {
    router.route("/users");
    router.route("/users")
        .get(UserController_1.getAllUsers)
        .post(UserController_1.createUser)
        .put(verifyJWT_1.verifyJWT, verifyAuthorized_1.verifyAuthorized, UserController_1.updateUser)
        .delete(verifyJWT_1.verifyJWT, verifyAuthorized_1.verifyAuthorized, UserController_1.deleteUser);
    router.route("/users/:id")
        .get(UserController_1.findById);
    router.route("/users/posts/:username")
        .get(UserController_1.getAllPostByUser);
    router.route("/users/login")
        .post(UserController_1.loginUser);
    router.route("/users/refresh")
        .post(UserController_1.getAccessToken);
};
exports.userRouteHandler = userRouteHandler;
