"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const verifyJWT_1 = require("../middlewares/verifyJWT");
const verifyAuthorized_1 = require("../middlewares/verifyAuthorized");
const router = (0, express_1.Router)();
router.route("/")
    .get(UserController_1.getAllUsers)
    .post(UserController_1.createUser)
    .put(verifyJWT_1.verifyJWT, verifyAuthorized_1.verifyAuthorized, UserController_1.updateUser)
    .delete(verifyJWT_1.verifyJWT, verifyAuthorized_1.verifyAuthorized, UserController_1.deleteUser);
router.route("/:id")
    .get(UserController_1.findById);
router.route("posts/:username")
    .get(UserController_1.getAllPostByUser);
router.route("/login")
    .post(UserController_1.loginUser);
router.route("/refresh")
    .post(UserController_1.getAccessToken);
exports.default = router;
