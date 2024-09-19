'use server'

import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import gettoken from './verifyToken'

const prisma = new PrismaClient().$extends(withAccelerate())

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
