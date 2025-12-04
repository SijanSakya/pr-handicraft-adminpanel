import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';
import { SUPABASE_KEY, SUPABASE_URL } from './lib/getEnvs';

// List of public routes
const publicRoutes = ['/signin', '/register', '/signup'];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      get(name: string) {
        return req.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: any) {
        res.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: any) {
        res.cookies.delete({ name, ...options });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isPublic = publicRoutes.some((route) => req.nextUrl.pathname.startsWith(route));

  // -------------------------
  // 1️⃣ If route is public (/signin, /register, etc.)
  // -------------------------
  if (isPublic) {
    // Logged-in user should NOT access public routes
    if (user) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return res;
  }

  // -------------------------
  // 2️⃣ Protected routes
  // -------------------------
  if (!user) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return res;
}

// -------------------------
// Matcher: protect everything except public/static files
// -------------------------
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)'],
};
