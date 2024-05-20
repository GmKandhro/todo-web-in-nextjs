'use client'

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs'
import { X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

import { useToast } from '../ui/use-toast';
import { PromiseType } from '@/types/Apiresponse';
import { useTodoContext } from '@/context';
import UpdateForm from './updateForm';

type todoCardProps = {
  title: string;
  description:string,
  createdAt:Date,
  _id:string
};

export function TodoCard({ title, description, createdAt,_id }:todoCardProps) {
  const { toast } = useToast();
  const { newTodoAdded, setNewTodoAdded }:any= useTodoContext();

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`/api/todo/delete/${_id}`)
      setNewTodoAdded(!newTodoAdded)
      toast({
        title: 'Todo deleted successfully',
      });

    } catch (error) {
      const err = error as AxiosError<PromiseType>
      toast({
        title: err.response?.data.message,
      });
      
    }
  };

  return (
    <Card className="card-bordered b-1 w-[400px]">
    <CardHeader>
      <div className="flex justify-between items-center">
        <CardTitle>{title}</CardTitle>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='secondary'>
              Edit
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
               <UpdateForm title={ title} description={description} id={_id}/>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              {/* <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction> */}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='destructive'>
              <X className="w-5 h-5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete
                this message.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <CardContent className='p-0'>
          <p className="text-sm  text-gray-600">{description}</p>
        </CardContent>
      <div className="text-sm">
        {dayjs(createdAt).format('MMM D, YYYY h:mm A')}
      </div>
    </CardHeader>
    
  </Card>
  );
}