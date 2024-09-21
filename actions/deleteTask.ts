/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import gettoken from './verifyToken';
import prisma from '@/db';

interface Task {
    id: string;
    title: string;
    description: string | null;
    userId: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    priority: "LOW" | "MEDIUM" | "HIGH";
    createdAt: Date;
    dueDate: string;
}
interface ErrorResponse {
    error: string;
}

type DeleteTaskResponse = Task | ErrorResponse;

export default async function deleteTask(taskId: string): Promise<DeleteTaskResponse> {
    try {
        const userId = await gettoken();

        if (!userId) {
            return { error: 'Not authenticated.' };
        }

        const deletedTask = await prisma.task.delete({
            where: {
                userId: userId,
                id: taskId,
            },
        });

        return deletedTask;
    } catch (err: unknown) {
        console.error('Error deleting task:', err);
        return { error: (err as any).code === 'P2025' ? 'Task not found.' : 'Failed to delete task.' };
    }
}
