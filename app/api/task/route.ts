import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { TaskSchema } from '@/zod/userTaskType';
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient().$extends(withAccelerate())

export async function POST(req: NextRequest) {
    const body = await req.json()
    const taskData = TaskSchema.safeParse(body)
    if (!taskData.success) {
        return NextResponse.json({
            msg: "Invalid data type"
        }, { status: 200 });
    }

    const userData = cookies().get('access_token')
    if (!userData) {
        return NextResponse.json({
            msg: "Not valid form of token"
        }, { status: 400 });
    }
    const secert = process.env.NEXT_PUBLIC_JWT_PASSWORD
    const decoded = jwt.verify(userData.value, secert);
    if (!decoded) {
        return NextResponse.json({
            msg: "Not verified user"
        }, { status: 400 });
    }
    const userId = decoded.userID;

    try {
        const task = await prisma.task.create({
            data: {
                title: taskData.data.title,
                description: taskData.data.description,
                status: taskData.data.status,
                priority: taskData.data.priority,
                dueDate: taskData.data.dueDate,
                userId: userId,
            }
        })
        return NextResponse.json({
            msg: "task created"
        });
    } catch (err) {
        console.error('Error:', err);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}