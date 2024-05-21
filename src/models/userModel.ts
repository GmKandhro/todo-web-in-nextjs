import mongoose , {Schema, Document}from "mongoose";

export interface Todo extends Document{
    title: string;
    description:string;
   
}

export const todoSchema:Schema<Todo> = new Schema({
    title:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true,
    }
},{timestamps:true})

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


const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>('User', userSchema);

export { UserModel};