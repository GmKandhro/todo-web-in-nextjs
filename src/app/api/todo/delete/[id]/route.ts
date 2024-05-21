import { dbConnect } from "@/app/dbconnect";
import { ApiError, ApiResponse } from "@/helpers/ApiResponses";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { UserModel } from "@/models/userModel";
import mongoose from "mongoose";

export async function DELETE(request: Request,{params}:{params:{id:string}}) {

  await dbConnect();
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value.toString() || "";
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
    const { userId } = decodedToken as { userId: string };

    if (!token || !userId) {
      return Response.json(new ApiError(302, "User not authenticated"));
    }


    

    const { id } = params
    const updatedUser = await UserModel.updateOne(
      { _id: userId },
      { $pull: { todos: { _id: id } } }
    );

    if (updatedUser.modifiedCount === 0) {
      return Response.json(
        new ApiError(400, "todo is not delete or todo is alredy deleted")
      );
    }

    return Response.json(new ApiResponse(200, "todo deleted successfull"));
  } catch (error) {
    return Response.json(new ApiError(500, "error while deleting todo"));
  }
}
