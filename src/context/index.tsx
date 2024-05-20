"use client"

import { useToast } from '@/components/ui/use-toast';
import { PromiseType } from '@/types/Apiresponse';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React, { createContext, useState, useContext } from 'react';

const TodoContext = createContext();

export const useTodoContext = () => {
  return useContext(TodoContext);
};

export const TodoProvider = ({ children } : any) => {
  const {toast} = useToast()
  const route = useRouter()
  const [newTodoAdded, setNewTodoAdded] = useState(false);
  

  const logoutUser = async function () {
    try {
      const response = await axios.get('/api/user/logout')
      toast({
        title: 'Logged out successfully',
      })
      route.replace('/')
    } catch (error) {
      const err = error as AxiosError<PromiseType>
      toast({
        title: err.response?.data.message || "user does not log out"
      })
    }
  }
  return (
    <TodoContext.Provider value={{ newTodoAdded, setNewTodoAdded  ,logoutUser}}>
      {children}
    </TodoContext.Provider>
  );
};
