import { Request, Response } from "express";
import { DPost } from "../models/Post";
import { DUser } from "../models/User";

export const Post = DPost;
export const User = DUser;

export const dec = <T>(func: (req: Request, res: Response) => Promise<T>) => {
    return async (req : Request,res : Response) : Promise<T |undefined> => {
        return await func(req,res);
    }
}
