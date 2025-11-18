import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Add routes that require authentication
const protectedRoutes = ['/dashboard', '/profile', '/settings'];

// Add routes that should redirect to dashboard if already authenticated
const authRoutes = ['/auth', '/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get token from cookies (if you switch to cookie-based auth)
  // For localStorage, this middleware won't work as-is since localStorage is client-side
  // This is a placeholder for when you implement server-side session management
  
  // For now, we're using client-side authentication with localStorage
  // So route protection is handled in the page components
  
  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
