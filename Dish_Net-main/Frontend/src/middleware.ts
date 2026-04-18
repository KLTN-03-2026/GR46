import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/user', '/store', '/admin'];
const authRoutes = ['/login', '/register', '/forgot-password'];
const adminRoute = '/admin';
const storeRoute = '/store';

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const [, payload = ''] = token.split('.');
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
    return JSON.parse(atob(padded)) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('access_token')?.value;
  const payload = token ? decodeJwtPayload(token) : null;
  const vaiTro = typeof payload?.vai_tro === 'string' ? payload.vai_tro : null;

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isAdminRoute = pathname.startsWith(adminRoute);
  const isStoreRoute = pathname.startsWith(storeRoute);

  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminRoute && vaiTro !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isStoreRoute && vaiTro !== 'chu_cua_hang') {
    const redirectPath = vaiTro === 'admin' ? '/admin' : '/';
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  if (isAuthRoute && token) {
    const redirectPath = vaiTro === 'admin' ? '/admin' : vaiTro === 'chu_cua_hang' ? '/store' : '/';
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/user/:path*', '/store/:path*', '/admin/:path*', '/login', '/register/:path*', '/forgot-password'],
};
