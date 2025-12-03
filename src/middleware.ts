import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const publicRoutes = ['/signin', '/signup', '/public'];

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all routes except for:
     * - API routes (/api)
     * - _next (Next.js internals)
     * - static files
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
