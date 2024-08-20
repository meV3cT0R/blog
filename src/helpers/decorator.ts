import { Request, Response } from "express";
import { DPost } from "../models/Post";
import { DUser } from "../models/User";
import { Model } from "mongoose";

export const Post = DPost;
export const User = DUser;

export const dec = <T>(func: (req: Request, res: Response) => Promise<T>): (req: Request, res: Response) => Promise<T | void> => {
    return async (req : Request,res : Response) : Promise<T | void> => {
        if(Post instanceof Model && User instanceof Model) {
            return await func(req,res);
        }
        res.status(500).json({
            error : "Our Stoopid developer did something wrong , I am very sorry."
        })
    }
}

