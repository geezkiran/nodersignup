import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.png, assets etc.
     */
    '/((?!api|_next/static|_next/image|assets|favicon.png).*)',
  ],
};

export default function middleware(req) {
  const url = req.nextUrl;

  // Get hostname of request (e.g. app.noderhq.com, app.localhost:3000)
  const hostname = req.headers.get('host') || '';

  // Check if it's the app subdomain
  if (
    hostname === 'app.noderhq.com' ||
    hostname === 'app.localhost:3000' ||
    hostname.startsWith('app.')
  ) {
    // Rewrite to the app-subdomain folder
    // e.g. app.noderhq.com/dashboard -> /app-subdomain/dashboard
    return NextResponse.rewrite(new URL(`/app-subdomain${url.pathname}`, req.url));
  }

  // Otherwise, it's the main domain (noderhq.com or localhost:3000)
  // Let it pass through normally to the main Next.js routes
  return NextResponse.next();
}
