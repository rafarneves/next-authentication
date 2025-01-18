import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    // Recupera o token do Cookies
    const token = req.cookies.get('authToken')

    if (token && (req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register'))) {
        console.log("xyxa")
        return NextResponse.redirect(new URL("/", req.url));
    }

    // // Se o token não existir, redireciona para a página de login
    if (!token && !req.nextUrl.pathname.startsWith('/login') && !req.nextUrl.pathname.startsWith('/register')) {
        console.log('Rafa')
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: [
        '/((?!_next|favicon.ico|public).*)', // Protege todas as rotas, exceto as especificadas
    ],
}