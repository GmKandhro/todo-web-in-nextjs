"use client"
import { useToast } from '@/components/ui/use-toast'
import { todoSchema } from '@/schemas/todoSchema'
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
import { Textarea } from '@/components/ui/textarea'
import { useTodoContext } from '@/context'

const CreatetodoPage = () => {
  const [isSubmitting, setisSubmitting] = useState(false)
  const {toast} = useToast()
  const route = useRouter()
  const { newTodoAdded, setNewTodoAdded }:any= useTodoContext();
  const form = useForm<z.infer<typeof todoSchema>>({
    resolver:zodResolver(todoSchema)
  })

  const onSubmit = async(data:z.infer<typeof todoSchema>)=>{
    setisSubmitting(true)
    try{
      const response = await axios.post('/api/todo/create',data)
     
      const status = response.data.status === 200
     
        toast({
          title:`${status ? "Success" : "Failed"}`,
          description: response.data.message
        })
        if (status) {
          const {reset} = form
          reset(); // Reset the form fields after successful submission
        }
        setNewTodoAdded(!newTodoAdded)
    }catch(err){
      const axioserror = err as AxiosError<PromiseType>
      toast({
        title:'sign up user',
        description: axioserror.response?.data.message || "Creating todo failed"
      })
    }finally{
      setisSubmitting(false)
    }
  }
  return (
    <>
      <div className="flex items-center mt-2 w-full flex-col bg-white  ">
  <div className="w-full max-w-lg shadow-md bg-gray-100 rounded-lg p-10 space-y-10">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </FormLabel>
              <Input
                id="title"
                placeholder="Enter your title"
                {...field}
                className="mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </FormLabel>
              <Textarea
                id="description"
                
                placeholder="Enter your description"
                {...field}
                className="mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader  className='animate-pulse'/> : "Add to do"}
        </Button>
      </form>
    </Form>
  </div>
</div>

  </>
  
  )
}

export default CreatetodoPage