'use server';

import gettoken from './verifyToken';
import prisma from '@/db';


interface TaskData {
    status: "TODO" | "IN_PROGRESS" | "DONE";
}

export default async function updateStatus(taskId: string, taskData: TaskData) {
    try {
        const userId = await gettoken();

        if (!userId) {
            return { error: 'Not authenticated.' };
        }

        // Update's the task in the database
        const updatedTaskStatus = await prisma.task.update({
            where: {
                userId: userId,
                id: taskId,
            },
            data: {
                status: taskData.status,
            },
        });
        return updatedTaskStatus;
    } catch (err) {
        console.error('Error updating task:', err);
        return { error: err.code === 'P2025' ? 'Task not found.' : 'Failed to update task.' };
    }
}
