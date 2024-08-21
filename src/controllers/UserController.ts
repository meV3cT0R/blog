import { Request, RequestHandler, Response } from "express"
import bcrypt from "bcrypt"
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken"
import { User } from "../helpers/decorator"
import {dec} from "../helpers/decorator";


export const getAllUsers : RequestHandler = dec(async (_:Request,res:Response)=> {
    const users = await User.find({})
    return res.status(200).json({
        data : {
            users
        }
    })
})

export const createUser : RequestHandler = dec(async(req:Request, res:Response)=> {
    const {firstName,lastName,username,password} = req.body;

    if(!firstName || !lastName || !username || !password) {
        return res.status(400).json({
            error : "All Fields are required"
        });
    }
    const found = await User.findOne({username}).exec();
    if(found){
        return res.status(409).json({
            error : `User with username ${username} already exists!`
        })
    }
    const hashedPwd = await bcrypt.hash(password,10);
    const user = {
        firstName,lastName,username,password:hashedPwd
    }
    await User.create(user);
    res.status(201).json({
        data : {
            user
        }
    });
})

export const updateUser : RequestHandler = dec(async(req:Request,res : Response) => {
    const {ObjectId} = req.body;

    if(!ObjectId) return res.status(400).json({
        error: "ObjectId is missing"
    })

    const user = await User.findOne({ObjectId:ObjectId}).exec();
    if(!user) {
        res.status(404).json({
            error : `User with ${ObjectId} not found`
        })
    }

    const newUser = await User.findOneAndUpdate({ObjectId},{
        ...user,
        ...ObjectId
    }, {
        new : true
    })

    res.status(200).json({
        data : {
            user : newUser
        }
    })
})

export const deleteUser : RequestHandler  = dec(async (req: Request, res : Response) => {
    const {ObjectId} = req.body;

    if(!ObjectId) return res.json({
        error : "ObjectId is required"
    })

    const user = await User.findOne({_id:ObjectId}).exec();
    if(!user) 
        return res.status(404).json({
            error : `User with ObjectId ${ObjectId} not found`
        })

    await User.deleteOne({_id:ObjectId})
    return res.status(200).json({
        data : {
            user
        }
    })
})

export const findById : RequestHandler= dec(async (req: Request, res : Response) => {
    const ObjectId = req.body.id;

    if(!ObjectId) return res.json({
        error : "ObjectId is required"
    })

    const user = await User.findOne({ObjectId}).exec();
    if(!user) 
        return res.status(404).json({
            error : `User with ObjectId ${ObjectId} not found`
        })

    return res.status(200).json({
        data : {
            user
        }
    })
})

export const loginUser = dec(async (req: Request, res : Response) => {
    const {username,password} = req.body;

    if(!username || !password) {
        return res.status(400).json({
            error : "username/password invalid"
        });
    }

    const user = await User.findOne({username}).exec();
    if(!user) 
        return res.status(400).json({
            error : `username/password invalid`
        })
    const allowed = await bcrypt.compare(password,user.password as string);
    if(!allowed)
        return res.status(400).json({
            error : `username/password invalid`
        })
    if(process.env.ACCESS_TOKEN_SECRET && process.env.REFRESH_TOKEN_SECRET){
        const accessToken = jwt.sign({username},process.env.ACCESS_TOKEN_SECRET, {
            expiresIn : "60s"
        })
        const refreshToken = jwt.sign({username},process.env.ACCESS_TOKEN_SECRET, {
            expiresIn : "60s"
        })

        await User.findOneAndUpdate({username},{
            ...user,
            refreshToken
        })

        res.cookie("jwt", refreshToken, {
            maxAge : 24*60*60,
            httpOnly : true,
            secure : true,
            sameSite : "none"
        })
        
        return res.status(200).json({
            data : {
                username : user.username,
                accessToken : accessToken
            }
        })
    }
    return res.status(400).json({
        error: "Something Horribly Went wrong"
    })
})


export const getAllPostByUser = dec(async (req : Request,res : Response)=> {
    const {username} = req.params;

    if(!username)
        return res.json({
            error : "Nigga what?"
        })

    const user = await User.findOne({username}).exec();

    if(!user) 
        return res.json({
            error: "Seriously nigga?"
        })

    
    res.json({
        data : {
            posts : user.posts
        }
    })
})

export const getAccessToken = dec(async (req : Request, res : Response) => {
    const refreshToken = req.cookies["jwt"];
    if(!refreshToken) return res.sendStatus(400);

    const user = await User.findOne({refreshToken}).exec();
    if(!user) return res.sendStatus(400);

    if(!process.env.REFRESH_TOKEN_SECRET) return res.sendStatus(500);
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err : VerifyErrors | null,decoded : JwtPayload | string | undefined)=> {
        if(err || (decoded as JwtPayload).username) res.sendStatus(403);
        if(!process.env.ACCESS_TOKEN_SECRET) return res.sendStatus(500);

        const accessToken = jwt.sign({username : user.username},process.env.ACCESS_TOKEN_SECRET, {
            expiresIn : "30s"
        })
        res.json({
            username : user.username,
            accessToken
        })
    });
})
