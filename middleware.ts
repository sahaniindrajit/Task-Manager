
import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("access_token");
    const url = req.nextUrl;

    if (!token && url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    if (token && (url.pathname === '/signin' || url.pathname === '/signup')) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}
