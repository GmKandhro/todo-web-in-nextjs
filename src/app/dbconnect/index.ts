import mongoose from "mongoose";

type connectionObject = {
    isConnected?:number
}


const connection:connectionObject = {}


export const dbConnect = async ()=>{
    if(connection.isConnected){
        console.log('database  already connected')
    }
    try {
        const db =await mongoose.connect(process.env.MONGODB_URI! || "")
        connection.isConnected = db.connections[0].readyState;
            console.log(db.connections[0].readyState)
            console.log("mongodb connection successfully connected")

    } catch (error:any) {
        console.log('DataBase connection failed due to this err::>' , error)
        process.exit(1)
    }
}