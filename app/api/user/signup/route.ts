import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { UserSchema } from '@/zod/userTaskType';
import bycrpt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const prisma = new PrismaClient().$extends(withAccelerate())

export async function POST(req: NextRequest) {
    const body = await req.json()
    const userData = UserSchema.safeParse(body)

    if (!userData.success) {
        return NextResponse.json({
            msg: "Invalid data type"
        }, { status: 400 });
    }

    try {

        const user = await prisma.user.findFirst({
            where: {
                email: userData.data.email
            }
        })
        if (user) {
            return NextResponse.json({
                msg: "User already exists/Try logging in"
            }, { status: 401 });
        }
        const hash = await bycrpt.hash(userData.data.password, 10);

        const createUser = await prisma.user.create({
            data: {
                email: userData.data.email,
                password: hash
            }
        })

        const payLoad = {
            username: createUser.email,
            userID: createUser.id

        }
        const secert = process.env.NEXT_PUBLIC_JWT_PASSWORD

        const token = jwt.sign(payLoad, secert);

        cookies().set({
            name: 'access_token',
            value: token,
            httpOnly: true,
            path: '/',
        })
        return NextResponse.json({
            msg: "User created succesfully"
        });
    } catch (err) {
        console.error('Error:', err);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
