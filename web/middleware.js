import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  // Currently, we don't have NextAuth, so checking localStorage via middleware is not possible (runs on server).
  // But we can check cookies if we had them. Since we are using localStorage for JWT, we will protect routes in a client-side component (AdminLayout).
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
