import mongoose from 'mongoose';
import  bcrypt from 'bcrypt';
import { randomUUID } from "crypto";
const chatSchema=new mongoose.Schema({
    id:{
        type:String,
        default:randomUUID,
    },
    role:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
});
const personSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    chats:[chatSchema],

});


//adding encryption to file
personSchema.pre('save',async function(next){
    const user=this;
    
    try{
        const salt=await  bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(user.password,salt);
        user.password=hashedPassword;
        // console.log("passord hasehd");
        next();
    }catch(err){
        console.log(err);
    }
})

personSchema.methods.comparePassword=async function(candidatePassword){
    try{
        console.log(this.password);
        console.log(candidatePassword);
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }catch(err){
        console.log(err);
        // return err;
    }
}



// Creating model from schema
const user=mongoose.model('users',personSchema);
export default user;