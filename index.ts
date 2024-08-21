// import express, { Request, Response,  } from "express";
// import PostRouter from "./src/routes/post";
// import UserRouter from "./src/routes/users";
// import { corsOption } from "./src/config/cors";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
import { App } from "./src/App";
import { router } from "./src/routes/Router";
import { masterRouter } from "./src/routes/masterRouter";
import { ErrorMiddleware } from "./src/middlewares/ErrorMiddleware";
// dotenv.config();

const PORT = 8080

// connectDB().catch(err => {
//     console.error(err);
//     process.exit(1);
// });


// app.use("/posts", PostRouter)
// app.use("/users", UserRouter)


new App(
    router(masterRouter(

    ),
        new ErrorMiddleware()
    )).start(PORT).catch((err :unknown) => {
        if (err instanceof Error) {
            console.error(err.message)
        }
        console.log(err);
        process.exit(1);
    })