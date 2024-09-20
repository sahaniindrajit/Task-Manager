'use server'

import gettoken from './verifyToken'
import prisma from '@/db';


export default async function getTask() {
    try {
        const userId = await gettoken();

        if (!userId) {
            return { error: 'Not authenticated.' };
        }

        const tasks = await prisma.task.findMany({
            where: { userId: userId }
        });

        return tasks;
    } catch (err) {
        console.error('Error fetching tasks:', err);
        return { error: 'Failed to fetch tasks.' };
    }
}
