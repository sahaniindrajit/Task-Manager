import { NextRequest, NextResponse } from 'next/server';
import { UserSchema } from '@/zod/userTaskType';
import bycrpt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import prisma from '@/db';


export async function POST(req: NextRequest) {
    const body = await req.json()
    const userData = UserSchema.safeParse(body)

    if (!userData.success) {
        return NextResponse.json({
            msg: "Invalid data type"
        }, { status: 400 });
    }
    try {

        const user = await prisma.user.findUnique({
            where: {
                email: userData.data.email
            }
        })
        if (!user) {
            return NextResponse.json({
                msg: "User doesn't exists/Try creating account "
            }, { status: 401 });
        }

        const passwordVerify = await bycrpt.compare(userData.data.password, user.password);
        if (!passwordVerify) {
            return NextResponse.json({
                msg: "Invalid Password"
            }, { status: 401 });
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
