'use server'
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    userId: string;
}

export default async function gettoken() {
    const token = cookies().get('access_token')?.value;

    if (!token) {
        throw new Error('Authentication token is missing.');
    }

    try {
        const secret = process.env.NEXT_PUBLIC_JWT_PASSWORD
        const decodedToken = jwt.verify(token, secret as string) as JwtPayload;
        if (!decodedToken) {
            throw new Error('Not Authentication.');
        }
        return decodedToken.userID
    } catch (error) {
        throw new Error('Invalid or expired token.');
    }
}
