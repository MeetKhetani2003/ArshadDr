import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // Protect all /admin routes except /admin/login
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const token = request.cookies.get('admin_token')?.value;
    
    // Check if token matches the secret
    if (token !== (process.env.ADMIN_SECRET || 'fallback_secret')) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  // Prevent logged in users from accessing the login page
  if (path === '/admin/login') {
    const token = request.cookies.get('admin_token')?.value;
    if (token === (process.env.ADMIN_SECRET || 'fallback_secret')) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
