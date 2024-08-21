import { Request,Response } from "express";

export class ErrorMiddleware {
    public async catchAll(req: Request,res : Response) : Promise<void> {
        const cType = req.headers["Content-Type"];
        if (cType == "application/json") {
            res.status(404).json({
                message: "404 - Page not found"
            })
        } else if (cType == "text/html") {
            res.status(404).send("<h1> 404 - Page not found </h1>")
        } else {
            res.status(404).send("404 - Page not Found")
        }


    }
}