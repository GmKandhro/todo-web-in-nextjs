import { dbConnect } from "@/app/dbconnect";
import { ApiError, ApiResponse } from "@/helpers/ApiResponses";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import { Todo, UserModel } from "@/models/userModel";

interface userIdType {
    userId:string
}
export async function POST(request:Request) {
    await dbConnect()
    try {
        const cookieStore = cookies()
        const token = cookieStore.get('token')?.value.toString() || ""
        const decodedToken= jwt.verify(token, process.env.JWT_SECRET!)
        const { userId } = decodedToken as { userId: string };
        if(!token || !userId){
            return Response.json(new ApiError(302,"user not authemticated"))
        }
        
        const user =await UserModel.findById(userId)
 
        const {title,description} =await request.json()

        const todo = {
            title,
            description,
        }

        user?.todos.push(todo as Todo)
        await user?.save()

        
        return Response.json(new ApiResponse(200,'Todo add successfull'))
    } catch (error) {
            return Response.json(new ApiError(500,'Error while creating todo'))
    }
}