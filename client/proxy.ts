import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/auth/login', '/auth/register'];

export function proxy(req: NextRequest) {

  const token = req.cookies.get('token')?.value;
  const pathname = req.nextUrl.pathname;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL('/chats', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/chats/:path*', '/users/:path*', '/settings/:path*', '/auth/:path*'],
};