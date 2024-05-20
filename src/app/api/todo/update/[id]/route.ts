import { dbConnect } from "@/app/dbconnect";
import { ApiError, ApiResponse } from "@/helpers/ApiResponses";
import { TodoModel } from "@/models/todoModel";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { UserModel } from "@/models/userModel";
import mongoose from "mongoose";

type Params ={
  id:string,
}
export async function PATCH(request:Request,{ params }: { params: Params }) {
    await dbConnect()
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("token")?.value.toString() || "";
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
        const { userId } = decodedToken as { userId: string };
    
        if (!token || !userId) {
          return Response.json(new ApiError(302, "User not authenticated"));
        }

        const {title,description} = await request.json()
        const {id} = params;

        const updatedUser = await UserModel.updateOne(
            { _id: userId, 'todos._id':id},
            {  $set: {
                "todos.$.title": title,
                "todos.$.description": description
            }
             }
        );

        if (updatedUser.modifiedCount === 0) {
            return Response.json(
              new ApiError(400, "todo is not updated due to some issue tay again")
            );
          }

       

        return Response.json(new ApiResponse(200,'todo updated successfull '))
        
        
        
    }catch(err){
        return Response.json(new ApiError(500,'Error while updating  todo'))

    }
}