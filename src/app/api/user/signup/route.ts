import {NextResponse, NextRequest} from  'next/server'
import { dbConnect } from '@/app/dbconnect/index';
import bcrypt from 'bcrypt'
import { UserModel } from '@/models/userModel';
import { ApiError, ApiResponse } from '@/helpers/ApiResponses';
// import { sendVerificationEmail } from '@/helpers/sendVerificationEmail';

export async function POST(req:Request) {
    dbConnect();
    try {
        const {password,email,username} =await req.json()


        const userExistsAndVerified = await UserModel.findOne({username,isVerify:true})

        if (userExistsAndVerified) {
            return Response.json(new ApiResponse(400,'user already exists'))
        }

        const userWithEmail = await UserModel.findOne({
            email
        });
    

        const verifyCode = Math.floor(900000 * Math.random() + 100000).toString()
        const expiryDate = new Date()
        expiryDate.setHours(expiryDate.getHours() + 1)

        if(userWithEmail){
            if(userWithEmail.isVerify === true){
                return Response.json(new ApiResponse(400,'user already exists'))
            }else{

            const hashedPassword =await bcrypt.hash(password,10)
            
            //   userWithEmail.email= email
            userWithEmail.username = username
              userWithEmail.password = hashedPassword
              userWithEmail.verifyCodeExpiry = expiryDate;
              userWithEmail.verifyCode = verifyCode;
              await userWithEmail.save();
            }
        }else{
            const hashedPassword =await bcrypt.hash(password,10)
            let user = new UserModel({
                email,  
                password : hashedPassword,
                username ,
                verifyCode,
                verifyCodeExpiry : expiryDate,
                todo:[]
            })
            await user.save()
        }
        // send verification mail
    //   const sendEmail =  await sendVerificationEmail(email,username,verifyCode)
     
       return Response.json(new ApiResponse(200,'user signup successfull '))
    } catch (error) {
       return Response.json(new ApiError(500,'error while signup user'))

    }
}