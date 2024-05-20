import z from 'zod'

const usernameValidation = z.string().max(12,'username should be less then 12 laters').min(3,'usernmae should be gratter then 3 laters')
const signupSchema = z.object({
   username:usernameValidation,
   email: z.string().email("Invalid Email"),
    password: z.string().min(6, 'password must be  at least 6 characters long'),
})

export {usernameValidation,signupSchema}