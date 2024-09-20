'use server';

import gettoken from './verifyToken';
import prisma from '@/db';

export default async function deleteTask(taskId) {
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
    } catch (err) {
        console.error('Error deleting task:', err);
        return { error: err.code === 'P2025' ? 'Task not found.' : 'Failed to delete task.' };
    }
}
