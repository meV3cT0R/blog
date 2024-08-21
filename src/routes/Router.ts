import {Router as ExpressRouter} from "express";
import cors from "cors";
import { corsOption } from "../config/cors";
import bodyParser from "body-parser";
import { ErrorMiddleware } from "../middlewares/ErrorMiddleware";

export const router = (masterRouter : ExpressRouter,errorMiddleware : ErrorMiddleware) : ExpressRouter => {
    const router = ExpressRouter();
    
    router.use(cors(corsOption))
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({extended:false}))
            .use("/",masterRouter)
            .all("*",errorMiddleware.catchAll)
    return router;
}