"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const cors_2 = require("../config/cors");
const body_parser_1 = __importDefault(require("body-parser"));
const router = (masterRouter, errorMiddleware) => {
    const router = (0, express_1.Router)();
    router.use((0, cors_1.default)(cors_2.corsOption))
        .use(body_parser_1.default.json())
        .use(body_parser_1.default.urlencoded({ extended: false }))
        .use("/", masterRouter)
        .all("*", errorMiddleware.catchAll.bind(errorMiddleware));
    return router;
};
exports.router = router;
