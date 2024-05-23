"use client"
import CreatetodoPage from '@/components/customComponents/createTodo'
import GetTodos from '@/components/customComponents/get-todos'
import React from 'react'

const page = () => {
  return (
    <div>
      <h1 className='flex justify-center m-1'>Dashboard</h1>
      <CreatetodoPage />
      <GetTodos />
    </div>
  )
}

export default page