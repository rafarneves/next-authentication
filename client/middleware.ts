import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    // Recupera o token do Cookies
    const token = req.cookies.get('authToken');

    // Se o token não existir, redireciona para a página de login
    if (!token && !req.nextUrl.pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next|favicon.ico|login|register|public).*)', // Protege todas as rotas, exceto as especificadas
    ],
}