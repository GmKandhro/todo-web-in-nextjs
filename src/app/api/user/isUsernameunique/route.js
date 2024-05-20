import { NextResponse, NextRequest } from "next/server";
import { dbConnect } from "@/app/dbconnect/index";
import bcrypt from "bcrypt";
import { UserModel } from "@/models/userModel";
import { ApiError, ApiResponse } from "@/helpers/ApiResponses";
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers'

export async function GET(request:Request) {
    await dbConnect()
    try {
        
    } catch (error) {
        
    }
}