
import { dbConnect } from "@/app/dbconnect";
import { ApiError, ApiResponse } from "@/helpers/ApiResponses";
import { cookies } from "next/headers";




export async function GET(request:Request) {
    await dbConnect()
    try {
        cookies().set('token', "")
        const response = new ApiResponse(200, "user logout successfull")
        return Response.json(response)
    } catch (error) {
        const response = new ApiError(500, "Error while logOut user")
        return Response.json(response)
    }
}