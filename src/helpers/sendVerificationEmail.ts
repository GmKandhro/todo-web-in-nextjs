// import type { NextApiRequest, NextApiResponse } from 'next';
// import { VerificationEmail } from '../../email';
// import {  PromiseType } from '@/types/Apiresponse';
// import { resend } from '@/lib/resend';


// export const sendVerificationEmail = async(email:string,username:string,verifyCode:string):Promise<PromiseType>=>{
//     try{ 
//         await resend.emails.send({
//             from: 'Acme <onboarding@resend.dev>',
//             to: email,
//             subject: 'gmtodos | Verify your account',
//             react: VerificationEmail({username,verifyCode}),
//         })

//         return  {success:true,message:"verification email send"}
//     }catch{
//         return {success:false,message:"Error while sending email for verification"}
//     }
// }