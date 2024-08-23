"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import express, { Request, Response,  } from "express";
// import PostRouter from "./src/routes/post";
// import UserRouter from "./src/routes/users";
// import { corsOption } from "./src/config/cors";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
const App_1 = require("./src/App");
const Router_1 = require("./src/routes/Router");
const masterRouter_1 = require("./src/routes/masterRouter");
const ErrorMiddleware_1 = require("./src/middlewares/ErrorMiddleware");
// dotenv.config();
const PORT = parseInt(process.env.PORT) || 8080;
// connectDB().catch(err => {
//     console.error(err);
//     process.exit(1);
// });
// app.use("/posts", PostRouter)
// app.use("/users", UserRouter)
new App_1.App((0, Router_1.router)((0, masterRouter_1.masterRouter)(), new ErrorMiddleware_1.ErrorMiddleware())).start(PORT).catch((err) => {
    if (err instanceof Error) {
        console.error(err.message);
    }
    console.log(err);
    process.exit(1);
});
