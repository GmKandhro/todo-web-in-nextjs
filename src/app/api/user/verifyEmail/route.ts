import { NextResponse, NextRequest } from "next/server";
import { dbConnect } from "@/app/dbconnect/index";
import bcrypt from "bcrypt";
import { UserModel } from "@/models/userModel";
import { ApiError, ApiResponse } from "@/helpers/ApiResponses";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { code, username } = await request.json();

    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(new ApiError(400, "user not found"));
    }

    const isCodeValid = (user.verifyCode = code);
    const isUserNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (!isCodeValid && !isUserNotExpired) {
      return Response.json(
        new ApiResponse(
          400,
          "The verification code is invalid or has expired. Please request a new code."
        )
      );
    } else if (!isCodeValid) {
      return Response.json(
        new ApiResponse(400, "The verification code is invalid.")
      );
    } else if (!isUserNotExpired) {
      return Response.json(
        new ApiResponse(
          400,
          "Your account verification has expired. Please sign up again and verify your account."
        )
      );
    }
    user.isVerify = true;
    user.verifyCodeExpiry = undefined;
    await user.save();

    return Response.json(new ApiResponse(200, "Verification successful."));
    
  } catch (error) {
    return Response.json(new ApiError(500, "error while verifying user"));
  }
}
