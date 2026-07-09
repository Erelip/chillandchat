import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = [ '/auth/login', '/auth/register' ];

export function proxy(req: NextRequest) {
  const accessToken = req.cookies.get('token')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;
  const pathname = req.nextUrl.pathname;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthenticated = Boolean(accessToken || refreshToken);

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL('/chats', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/chats/:path*', '/users/:path*', '/settings/:path*', '/auth/:path*'],
};