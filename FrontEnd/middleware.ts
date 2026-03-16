import { NextResponse, type NextRequest } from 'next/server';

// Routes that require authentication
const PROTECTED_PREFIXES = ['/overview', '/orders', '/settings', '/admin', '/booster', '/become-booster'];

// Routes only for guests (redirect to dashboard if already logged in)
const AUTH_ROUTES = ['/login', '/register'];

// Admin-only routes
const ADMIN_PREFIXES = ['/admin'];

// Booster-only routes
const BOOSTER_PREFIXES = ['/booster'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Read access token from a cookie (set at login for middleware use)
  // Note: localStorage is not accessible in Edge middleware, so we use a cookie
  const accessToken = request.cookies.get('boost_access_token')?.value;
  const userRole = request.cookies.get('boost_user_role')?.value;

  const isAuthenticated = !!accessToken;
  const isAdmin = userRole === 'ADMIN';
  const isBooster = userRole === 'BOOSTER';

  // Redirect unauthenticated users away from protected routes
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route);

  if (isAuthRoute && isAuthenticated) {
    const dest = isAdmin ? '/admin/dashboard' : isBooster ? '/booster/dashboard' : '/overview';
    return NextResponse.redirect(new URL(dest, request.url));
  }

  // Block non-admin from admin routes
  const isAdminRoute = ADMIN_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL('/overview', request.url));
  }

  // Block non-boosters from booster routes
  const isBoosterRoute = BOOSTER_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (isBoosterRoute && !isBooster && !isAdmin) {
    return NextResponse.redirect(new URL('/overview', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/overview',
    '/overview/:path*',
    '/orders',
    '/orders/:path*',
    '/settings',
    '/settings/:path*',
    '/admin',
    '/admin/:path*',
    '/booster',
    '/booster/:path*',
    '/become-booster',
    '/become-booster/:path*',
    '/login',
    '/register',
  ],
};
