import {connect} from "mongoose";

export const connectMongoose = async ()=> {
    try {
        if(process.env.DATABASE_URI)
            await connect(process.env.DATABASE_URI)
        else
            throw new Error("Something Horribly went Wrong")
    }catch(err) {
        console.error(err);
    }
}


