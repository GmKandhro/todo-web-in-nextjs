import { z } from 'zod';

export const todoSchema = z.object({
  title: z.string().min(10, { message: 'Title must be at least 10 characters long' }).max(120, { message: 'Title cannot exceed 120 characters' }),
  description: z.string().min(20, { message: 'Description must be at least 20 characters long' }).max(500, { message: 'Description cannot exceed 500 characters' }),
});
