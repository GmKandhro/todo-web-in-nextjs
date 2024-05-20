"use client"
import { useToast } from '@/components/ui/use-toast'
import { signupSchema } from '@/schemas/signupSchema'
import { PromiseType } from '@/types/Apiresponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { Loader } from 'lucide-react'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const SignupPage = () => {
  const [isSubmitting, setisSubmitting] = useState(false)
  const {toast} = useToast()
  const route = useRouter()
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver:zodResolver(signupSchema)
  })

  const onSubmit = async(data:z.infer<typeof signupSchema>)=>{
    setisSubmitting(true)
    try{
      const response = await axios.post('/api/user/signup',data)
     
      const status = response.data.status === 200
     
        toast({
          title:`${status ? "Success" : "Failed"}`,
          description: response.data.message
        })
        status && route.replace(`/verify/${data.username}`) 

    }catch(err){
      const axioserror = err as AxiosError<PromiseType>
      toast({
        title:'sign up user',
        description: axioserror.response?.data.message || "sign up failed"
      })
    }finally{
      setisSubmitting(false)
    }
  }
  return (
    <>
    <div className="flex justify-center items-center flex-col  h-[90vh] bg-gray-100">
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign up User</h1>
      <div className="w-[70vw] max-w-md bg-white shadow-md rounded-md p-8 space-y-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </FormLabel>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    {...field}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </FormLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </FormLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader className='animate-spin'/> : "Sign up"}
            </Button>
          </form>
        </Form>
        <Link className='mt-2' href="/signin">Already have a account</Link>
      </div>
    </div>
  </>
  
  )
}

export default SignupPage