'use server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies(); // Obtén el store de cookies
  const token = cookieStore.get('authToken')?.value;
  const pathname = request.nextUrl.pathname;

  const cookieStore2 = await cookies(); // Obtén el store de cookies
  const role = cookieStore2.get('role')?.value;
  console.log('Role:', role);

  // Assuming you store the token in a cookie
  console.log('Middleware ejecutado para:', request.url);
  // console.log('Token encontrado:', token);

  // Paths that don't require authentication
  const publicPaths = ['/login', '/'];

  if (!token) {
    // If no token is present, redirect to the login page if not already there
    if (!publicPaths.includes(pathname)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  // User is authenticated, now handle role-based redirection

  // If the user is on a public path after authentication, redirect them based on their role
  if (publicPaths.includes(pathname)) {
    if (role) {
      const expectedPath = `/user/${role}`;
      return NextResponse.redirect(new URL(expectedPath, request.url));
    }
    // If no role is found after authentication on a public path, proceed (should ideally not happen)
    return NextResponse.next();
  }

  // User is on a protected route

  if (role) {
    const expectedPath = `/user/${role}`;
    // Allow access if the pathname starts with the expected role-based path
    if (pathname.startsWith(expectedPath)) {
      return NextResponse.next();
    }
    // Redirect to the expected role-based path if the current protected path doesn't match
    return NextResponse.redirect(new URL(expectedPath, request.url));
  }

  // If the user has a token but no role, you might want to redirect to an error page or a page to set the role
  console.warn('Usuario autenticado sin rol definido.');
  return NextResponse.redirect(new URL('/unauthorized', request.url));
}

// Define which routes this middleware should run for
export const config = {
  matcher: ['/user/:path*', '/', '/about'], // Example protected routes
};