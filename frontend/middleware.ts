import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { paths, protectedRoutes } from '@/paths';
import { parse } from 'cookie';

export function middleware(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie');
  let token;

  if (cookieHeader) {
    const cookies = parse(cookieHeader);
    token = cookies.access;
    console.log(token);
  }

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = paths.auth.signIn;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: protectedRoutes, 
}
