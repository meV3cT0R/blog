import { NextFunction, Response,Request } from "express";
import { User } from "../models/User";

export const verifyAuthorized = async (req : Request,res:Response,next:NextFunction) => {
   const refreshToken = req.cookies["jwt"];
   if(!refreshToken) return res.sendStatus(400);

   const user = await User.findOne({refreshToken}).exec();
   if(!user) return res.sendStatus(404);

   console.log("req.body.postedBy : ",req.body.postedBy.id);
   console.log("user.id : ",user.id);
   if(req.body.postedBy.id != user.id) 
      return res.sendStatus(403);

   next();
}