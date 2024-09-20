'use server';

import gettoken from './verifyToken';
import prisma from '@/db';


interface TaskData {
    title: string;
    description: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    priority: "LOW" | "MEDIUM" | "HIGH";
    dueDate?: string; // Optional field
}

export default async function editTask(taskId: string, taskData: TaskData) {
    try {
        const userId = await gettoken();

        if (!userId) {
            return { error: 'Not authenticated.' };
        }

        // Update's the task in the database
        const updatedTask = await prisma.task.update({
            where: {
                userId: userId,
                id: taskId,
            },
            data: {
                title: taskData.title,
                description: taskData.description,
                status: taskData.status,
                priority: taskData.priority,
                ...(taskData.dueDate && { dueDate: new Date(taskData.dueDate).toISOString() }), // Only include if provided
            },
        });

        return updatedTask;
    } catch (err) {
        console.error('Error updating task:', err);
        return { error: err.code === 'P2025' ? 'Task not found.' : 'Failed to update task.' };
    }
}
