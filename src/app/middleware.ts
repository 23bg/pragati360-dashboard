// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("access_token")?.value;
    const { pathname } = req.nextUrl;

    const publicPaths = ["/login", "/signup", "/verification"];

    // If the path is public, let them through
    if (publicPaths.some(path => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // If there is no token and the path is not public, redirect to login
    if (!token) {
        const loginUrl = new URL("/login", req.url);
        // you can add a callback url query param here
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
