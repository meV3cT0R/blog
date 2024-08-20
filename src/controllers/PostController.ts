import { Request, Response } from "express";
import { Post } from "../models/Post";
import { User } from "../models/User";

export const getAllPosts = async (req : Request,res:Response)=> {
    const posts = await Post.find({})
    res.status(200).json({
        data : {
            posts
        }
    })
}

export const createPost = async (req: Request, res : Response)=> {
    const {title,content,username} = req.body;

    if(!title || !content || !username)
        return res.status(400).json({
            error : "Title,content,username Are all required"
        })

    const user = await User.findOne({username}).exec();

    if(!user)
        return res.status(404).json({
            error : "Something Horribly Went Wrong!!"
        })

    await Post.create({
        title,content,postedBy:user
    })
    const posts = await Post.find({})
    res.status(201).json({
        data : {
            posts
        }
    })
}


export const likePost = async(req:Request , res : Response)=> {
    const {postId,username} = req.body;

    if(!postId || !username) {
        return res.status(400).json({
            error : "post id and username are both required field"
        })
    }

    const user = await User.findOne({username}).exec();
    const post = await Post.findOne({_id:postId}).exec()

    if(!post) {
        return res.status(404).json({
            error : `Post with given id ${postId} not found`
        })
    }

    if(!user) {
        return res.status(404).json({
            error : "Something horribly went wrong"
        })
    }
    const alreadyLiked = post.likedBy.find(u=>{
        console.log(`${u.id} == ${user.id}`)
        return true
    })
    console.log(user._id)

    let likedBy = []
    if(alreadyLiked){
        likedBy = post.likedBy.filter(u=>u._id==user._id)
    }else {
        user.liked.push(post);
        await user.save();
        post.likedBy.push(user);
        await post.save()
    }


    return res.status(200).json({
        data : {
            post
        }
    }) 
}


