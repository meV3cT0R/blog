import {Document} from "mongoose";
import { IUser } from "./IUser";

export interface IPost extends Document {
    title : string;
    content : string;
    postedBy : IUser;
    likedBy : IUser[];
    createdAt : Date;
}