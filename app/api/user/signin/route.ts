import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { UserSchema } from '@/zod/userTaskType';
import bycrpt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const prisma = new PrismaClient().$extends(withAccelerate())

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const userData = UserSchema.parse(body)

        if (!userData) {
            return NextResponse.json({
                msg: "Invalid data type"
            }, { status: 200 });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: userData.email
            }
        })
        if (!user) {
            return NextResponse.json({
                msg: "User doesn't exists/Try creating account "
            }, { status: 200 });
        }

        const passwordVerify = await bycrpt.compare(userData.password, user.password);
        if (!passwordVerify) {
            return NextResponse.json({
                msg: "Invalid Password"
            }, { status: 200 });
        }
        const payLoad = {
            username: user.email,
            userID: user.id

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
            msg: "Login succesfully"
        });
    } catch (err) {
        console.error('Error:', err);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
