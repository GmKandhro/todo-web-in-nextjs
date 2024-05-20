import { dbConnect } from "@/app/dbconnect";
import { ApiError, ApiResponse } from "@/helpers/ApiResponses";
import { TodoModel } from "@/models/todoModel";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { UserModel } from "@/models/userModel";
import mongoose from "mongoose";

export async function DELETE(request:Request ,{params}) {

  await dbConnect();
 try {
    console.log(params)
    return Response.json({ok:"ok"})
}catch(err){
     return Response.json({bad:"bad"})

 }
}
