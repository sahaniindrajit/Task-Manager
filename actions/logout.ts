'use server'

import { cookies } from 'next/headers'
export default async function logout() {
    cookies().delete('access_token')

}