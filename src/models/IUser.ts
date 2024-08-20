import {Document} from "mongoose";
import { IPost } from "./IPost";

export interface IUser extends Document{
    firstName:string;
    lastName:string;
    posts : IPost[];
    liked : IPost[];
    username: string;
    password : string;
    refreshToken: string;
}