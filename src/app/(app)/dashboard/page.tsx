"use client"
import CreatetodoPage from '@/components/customComponents/createTodo'
import GetTodos from '@/components/customComponents/get-todos'
import React from 'react'

const page = () => {
  return (
    <div>
      <CreatetodoPage />
      <GetTodos />
    </div>
  )
}

export default page