import { NextResponse } from 'next/server';

export function proxy(request) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host');
  
  // Define your domain
  const domain = 'noderhq.com';
  
  // Check if we are on the blog subdomain
  const isBlogSubdomain = host === `blog.${domain}` || host === `blog.localhost:3000`;

  if (isBlogSubdomain) {
    // If the path already starts with /blog, we don't want to double-nest
    // But usually, on a subdomain, the user shouldn't see /blog in the URL
    // So we rewrite everything to /blog/...
    if (!url.pathname.startsWith('/blog')) {
      url.pathname = `/blog${url.pathname === '/' ? '' : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

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
