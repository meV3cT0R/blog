import mongoose from "mongoose";
import { IUser } from "./IUser";

const UserSchema = new mongoose.Schema<IUser>({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    posts : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post"
    }],
    liked : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post"
    }],
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    refreshToken : {
        type : String,
        default : ""
    }
})

export const DUser = mongoose.model<IUser>("User",UserSchema);

