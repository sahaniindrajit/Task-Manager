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
    dueDate: Date;
}

type DeleteTaskResponse = Task;

export default async function deleteTask(taskId: string): Promise<DeleteTaskResponse> {

    const userId = await gettoken();

    const deletedTask = await prisma.task.delete({
        where: {
            userId: userId,
            id: taskId,
        },
    });

    return deletedTask;
}

