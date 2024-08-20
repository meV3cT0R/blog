import { NextFunction, Response,Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
export const verifyJWT = (req : Request,res:Response,next:NextFunction) => {
    const authHeader : string | undefined = (req.headers.authorization || req.headers.Authorization) as string;
    if(!authHeader?.startsWith("Bearer ")) return res.sendStatus(403);

    if(process.env.ACCESS_TOKEN_SECRET) {
        jwt.verify(authHeader.split(" ")[1],process.env.ACCESS_TOKEN_SECRET,(err ,decoded)=> {
            let valid = true
            const actUsername =(decoded as JwtPayload).username
            if(!actUsername) return res.sendStatus(403);
            if(req.body?.username)
                valid = req.body.username==actUsername
            if(err || !valid) return res.sendStatus(403);
            next();
        })
    }else {   
        return res.sendStatus(500)
    }
}