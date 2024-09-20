import { NextRequest, NextResponse } from 'next/server';
import { TaskSchema } from '@/zod/userTaskType';
import gettoken from '@/actions/verifyToken';
import prisma from '@/db';


export async function POST(req: NextRequest) {
    const body = await req.json()
    const taskData = TaskSchema.safeParse(body)
    if (!taskData.success) {
        return NextResponse.json({
            msg: "Invalid data type"
        }, { status: 400 });
    }
    let userId: string;
    try {
        userId = await gettoken();
    } catch (err) {
        return NextResponse.json({
            msg: "Not a valid form of token",
            error: err.message
        }, { status: 400 });
    }

    if (!userId) {
        return NextResponse.json({
            msg: "User not authenticated"
        }, { status: 401 });
    }

    try {
        const task = await prisma.task.create({
            data: {
                title: taskData.data.title,
                description: taskData.data.description,
                status: taskData.data.status,
                priority: taskData.data.priority,
                dueDate: taskData.data.dueDate,
                userId: userId
            }
        })
        return NextResponse.json(task)
    } catch (err) {
        console.error('Error:', err);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}