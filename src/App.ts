import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { connectMongoose } from "./config/connectDB";
import  mongoose, { Mongoose } from "mongoose";
dotenv.config();

export class App {
    private readonly app : express.Application;
    private readonly mongoose : Mongoose;

    constructor(private router : express.Router) {
        this.app = express();
        this.mongoose = mongoose;
        this.connectDB();
        this.config();
        this.app.use(this.router);
    }

    private config() : void {
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname,"..","public")))
    }


    public async start(port : number) : Promise<void> {
        return await new Promise(resolve=> {
            this.mongoose.connection.once("open",()=> {
            console.log('Connected To Mongo DB')
                this.app.listen(port,()=> {
                    console.log(`Server Started on port : ${port}`)
                })
            })
            
            resolve();
        })
    }

    private connectDB() : void {
        connectMongoose().catch(err=> {
            if(err instanceof Error){
                console.error(err.message)
            }
            console.error(err);
            process.exit(1);
        })
    }
}
