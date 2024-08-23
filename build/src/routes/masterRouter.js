"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.masterRouter = void 0;
const express_1 = require("express");
const users_1 = require("./users");
const post_1 = require("./post");
const masterRouter = () => {
    const router = (0, express_1.Router)();
    (0, users_1.userRouteHandler)(router);
    (0, post_1.postRouteHandler)(router);
    return router;
};
exports.masterRouter = masterRouter;
