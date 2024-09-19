// pages/dashboard/_middleware.ts
import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("access_token");
    const url = req.url;

    if (!token && url.includes('/dashboard')) {
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    if (token && (url === 'http://localhost:3000/signin' || url === 'http://localhost:3000/signup')) {
        return NextResponse.redirect('http://localhost:3000/dashboard');
    }

    return NextResponse.next();
}
