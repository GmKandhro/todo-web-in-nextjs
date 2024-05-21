import { dbConnect } from "@/app/dbconnect";
import { ApiError, ApiResponse } from "@/helpers/ApiResponses";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { UserModel } from "@/models/userModel";
import mongoose from "mongoose";

export async function GET(request:Request) {
    await dbConnect()
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("token")?.value.toString() || "";
        if (!token) {
            return Response.json(new ApiError(302, "User not authenticated"));
          }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
        const { userId } = decodedToken as { userId: string };
    
        if (!token || !userId) {
          return Response.json(new ApiError(302, "User not authenticated"));
        }

        const user = await UserModel.aggregate([
            {"$match": {"_id": new mongoose.Types.ObjectId(userId)}},
            {"$unwind":("$todos")},
            { $group: {
                _id: "$_id", 
                todos: { $push: "$todos" } 
            }}

        ])

        if(!user){
            return Response.json(new ApiError(404,"user not found"))
        }
    
        return Response.json(new ApiResponse(200,'todos fetched successfull',user[0].todos))
    } catch (error:any) {
        return Response.json(new ApiError(500,"error while fetching todos"))
    }
}