"use client"
import { PromiseType } from '@/types/Apiresponse'
import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { useToast } from '../ui/use-toast'
import { Loader2 } from 'lucide-react'
import { TodoCard } from './todoCard'
import { useTodoContext } from '@/context'

type todoTypes ={
    _id:string,
    title:string,
    description:string,
    createdAt:Date
}

const GetTodos = () => {
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(false)
    const {toast} = useToast()
    const { newTodoAdded  } :any= useTodoContext();
    useEffect(() => {
    
     (async function(){

        try {
            setLoading(true)
            const response = await axios.get('/api/todo/get-todos')
            setTodos(response.data.data)
           
        } catch (error) {
            const err = error as AxiosError<PromiseType>
            toast({
                title: err.response?.data.message || "",
            })
        }finally{
            setLoading(false)
        }
     })()
    },[newTodoAdded,toast])
    

  return (
  <div className='flex flex-col  items-center justify-center w-full h-full '>
        <h1 className='text-2xl font-bold my-4'>Your Todos</h1>
  <div className='flex flex-row flex-wrap items-center gap-2 justify-center w-full h-full '>
        {loading ? <Loader2 className='animate-spin' /> : (todos ? todos.map((todo:todoTypes,index)=>(
            <TodoCard key={index} {...todo} />
        )) : <h1 className="text-2xl font-bold text-gray-700 mt-10">No tasks yet. Start by adding your first to-do!</h1>
    )}
  </div>
  </div>

    
  )
}

export default GetTodos