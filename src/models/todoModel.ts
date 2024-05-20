import mongoose , { Schema,Document } from 'mongoose';

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

export const TodoModel = mongoose.models.Todo || mongoose.model("Todo",todoSchema); 