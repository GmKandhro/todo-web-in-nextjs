import { dbConnect } from "@/app/dbconnect";
import { ApiError, ApiResponse } from "@/helpers/ApiResponses";
import { UserModel } from "@/models/userModel";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";


export async function GET(request:Request) {
    await dbConnect()
    try {
        const token = cookies().get("token")?.value.toString() || ""
        const decoded = jwt.verify(token, process.env.JWT_SECRET!)
        const { userId } = decoded as { userId: string };

        const user =await UserModel.findById(userId)

        return Response.json(new ApiResponse(200 ,'user data fetched', user))
        
    } catch (error) {
        return Response.json(new ApiError(500 ,'user data not fetched'))
        
    }
}
