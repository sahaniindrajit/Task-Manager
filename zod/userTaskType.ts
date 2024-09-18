import { z } from 'zod';
import { StatusSchema, PrioritySchema } from './enumType';

// User Schema
export const UserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

// Task Schema
export const TaskSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    status: StatusSchema,
    priority: PrioritySchema,
    createdAt: z.date(),
    dueDate: z.date().optional(),
});
