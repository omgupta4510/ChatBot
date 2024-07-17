import { connect, disconnect } from "mongoose";
async function connectToDatabase(){
    try{
        await connect(process.env.MONGODB_URL);
    }catch(err){
        console.log(err);
    } 
}

async function disconnectFromDatabase(){
    try{
        await disconnect();
    }catch(err){
        console.log(err);
    }
}

export {connectToDatabase,disconnectFromDatabase};