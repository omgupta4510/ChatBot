import User from "../models/User.js";
import {compare} from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import { COOKIE_NAME } from "../utils/constants.js";
import { log } from "console";
export const getAllUsers=async (req,res)=>{
    try{
        const user=await User.find();
        return res.status(200).json({
            message:"Data fecthed",
            user
        });
    }catch(err){
        console.log(err);
        res.status(501).json("Internal Server Error");
    }
};

export const userSignUp=async (req,res)=>{
    try{
        const data=req.body;
        const user=new User(data);
        const response=await user.save();

        //create token and store
        res.clearCookie(COOKIE_NAME,{
            
            path:"/",
            domain:"loaclhost",
            httpOnly:true,
            signed:true
        });
        const payload={
            id:user._id.toString(),
            email:user.email
        };
        const token=generateToken(payload,"7d");
        let expires=new Date();
        expires.setDate(expires.getDate()+7);
        return res.cookie("auth_token",token,
            { 
                path:"/",
                domain:"loaclhost",
                expires,
                httpOnly:true,
                signed:true
            }).json({message:"pk",name:user.name,email:user.email});
    }catch(err){
        console.log(err);
        res.status(501).json("Internal Server Error");
    }
};

export const userLogin=async (req,res)=>{
    try{
        const {email,password}=req.body;
        // console.log(password);
        
        const user=await User.findOne({email:email});
        // console.log(user);
        if(!user){
            return res.status(401).send("User not registered");
        }
       
        const flag=await compare(password,user.password);
        // console.log(flag);
        if(!flag)return res.status(403).json("wrong user");
        res.clearCookie(COOKIE_NAME,{
            
            path:"/",
            domain:"localhost",
            httpOnly:true,
            signed:true
        });
        const payload={
            id:user._id.toString(),
            email:user.email
        };
        const token=generateToken(payload,"7d");
        let expires=new Date();
        expires.setDate(expires.getDate()+7);
        return res.cookie("auth_token",token,
            { 
                path:"/",
                domain:"localhost",
                expires,
                httpOnly:true,
                signed:true
            }).json({message:"ok",name:user.name,email:user.email});
    }catch(err){
        console.log(err);
        res.status(501).json("Internal Server Error");
    }
};

export const verifyUser=async (req,res)=>{
    try{
        const {email,id}=res.locals.jwtData.email;
        const user=await User.findOne({id});
        // 
        if(!user){
            return res.status(401).send("User not registered or Token Malfunctioned");
        }
        // console.log(user);
        return res.status(200).json(user);
       
    }catch(err){
        console.log(err);
        res.status(501).json("Internal Server Error");
    }
};

export const userLogout=async (req,res)=>{
    try{
        const {email,id}=res.locals.jwtData.email;
        const user=await User.findOne({id});
        // 
        if(!user){
            return res.status(401).send("User not registered or Token Malfunctioned");
        }
        // console.log(user);
        res.clearCookie(COOKIE_NAME,{
            
            path:"/",
            domain:"localhost",
            httpOnly:true,
            signed:true
        }).status(200).json("done");
       
    }catch(err){
        console.log(err);
        res.status(501).json("Internal Server Error");
    }
};
