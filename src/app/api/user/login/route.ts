import { NextResponse, NextRequest } from "next/server";
import { dbConnect } from "@/app/dbconnect/index";
import bcrypt from "bcrypt";
import { UserModel } from "@/models/userModel";
import { ApiError, ApiResponse } from "@/helpers/ApiResponses";
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers'

export async function POST(request: Request,res:NextResponse) {
  await dbConnect();
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return Response.json(new ApiError(400, "Please provide both email and password"));
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(new ApiError(404, "User does not exist"));
    }

    const hashPassword = await bcrypt.compare(password, user.password);

    if (!hashPassword) {
      return NextResponse.json(new ApiError(400, "Invalid Password"));
    }

    const jwtSecret =  process.env.JWT_SECRET as string
    const token = jwt.sign(
      {
        userId: user._id,
      },
      jwtSecret
    );

    cookies().set('token', token)

    const response = new ApiResponse(200, "user login successful")
    return Response.json(response)
  } catch (error){
    return Response.json(new ApiError(500,'error while login user'))
  }
}
