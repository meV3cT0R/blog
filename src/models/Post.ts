import mongoose from "mongoose";
import { IPost } from "./IPost";

const PostSchema = new mongoose.Schema<IPost>({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    postedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    likedBy : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    createdAt : {
        type : Date,
        default : new Date()
    }
})

export const DPost = mongoose.model<IPost>("Post",PostSchema);