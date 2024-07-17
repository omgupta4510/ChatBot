import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
import { configureOpenAi } from "../config/openAiConfig.js";
import User from "../models/User.js";

export const generateChatCompletion=async(req,res,next)=>{
    try{
        const {message}=req.body;
        const user=await User.findById(res.locals.jwtData.id);
        if(!user){
            return res.status(401).send("User not registered or Token Malfunctioned");
        }
    
        //grab chats of user
        const chats=user.chats.map(({role,content})=>({role,content})) as ChatCompletionRequestMessage[];
        chats.push({content:message,role:"user"});
        user.chats.push({content:message,role:"user"});
        //send all chats with new one to OpenAi
        const config=configureOpenAi();
        const openai=new OpenAIApi(config);  
        const chatResponse=await openai.createChatCompletion({
            model:"gpt-3.5-turbo",
            messages:chats,
        });
    
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({chats:user.chats});
    }catch(err){
        return res.status(501).json("Internal Server Error");
    }
    
}
export const sendChatsToUser=async(req,res,next)=>{
    try{
        const {message}=req.body;
        const user=await User.findById(res.locals.jwtData.id);
        if(!user){
            return res.status(401).send("User not registered or Token Malfunctioned");
        }
        // console.log(user);
        
        return res.status(200).json({message:"ok",chats:user.chats});
    }catch(err){
        return res.status(501).json("Internal Server Error");
    }
    
}

export const deleteChats=async(req,res,next)=>{
    try{
        // const {message}=req.body;
        // const user=await User.findById(res.locals.jwtData.id);
        // if(!user){
        //     return res.status(401).send("User not registered or Token Malfunctioned");
        // }
        // // console.log(user);
        
        return res.status(200).json({message:"ok"});
    }catch(err){
        return res.status(501).json("Internal Server Error");
    }
    
}