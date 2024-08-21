import { Router } from "express"
import { userRouteHandler } from "./users";
import { postRouteHandler } from "./post";

export const masterRouter = () : Router=> {
    const router = Router();
    userRouteHandler(router);
    postRouteHandler(router);
    return router;
}