import {connectDB} from "./src/config/connectDB";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import PostRouter from "./src/routes/post";
import UserRouter from "./src/routes/users";
import cors from "cors";
import { corsOption } from "./src/config/cors";
import cookieParser from "cookie-parser";

require("dotenv").config();
const app = express();

const PORT = 8080

connectDB();

app.use(cors(corsOption))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.json());

app.use("/posts",PostRouter)
app.use("/users",UserRouter)

app.all("*",(req :Request,res : Response)=> {
    const cType  = req.headers["Content-Type"];
    if(cType=="application/json") {
        res.status(404).json({
            message : "404 - Page not found"
        })
    }else if(cType=="text/html") {
        res.status(404).send("<h1> 404 - Page not found </h1>")
    }else {
        res.status(404).send("404 - Page not Found")
    }
})

mongoose.connection.once("open", () => {
    console.log("Connected to Mango DB")
    app.listen(PORT, () => {
        console.log(`Server's running on PORT ${PORT}`);
    })
}
);

