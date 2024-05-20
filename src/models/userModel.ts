import mongoose , {Schema, Document}from "mongoose";
import { Todo, todoSchema } from "./todoModel";



interface User extends Document {
    username: string;
    email:string;
    password:string;
    isVerify:boolean;
    verifyCode:string;
    verifyCodeExpiry:Date
    todos:[Todo]
}

const userSchema : Schema<User> = new Schema({
    username:{
        type:String,
        required:[true,'username is required'],
        unique:true
    },
    email:{
        type:String,
        required:[true,'email is required'],
    },
    password:{
        type:String,
        required:[true,'password is required'],
    },
    isVerify:{
        type:Boolean,
        default:false
    },
    verifyCode:String,
    verifyCodeExpiry: Date,
    todos:[todoSchema]
})

export const UserModel = mongoose.models.User || mongoose.model("User",userSchema); 