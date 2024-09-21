'use server';

import gettoken from './verifyToken';
import prisma from '@/db';

export default async function getTask() {

    const userId = await gettoken();



    const tasks = await prisma.task.findMany({
        where: { userId: userId },
    });

    return tasks;

}
