import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!username || !password) {
      return NextResponse.json({ success: false, message: 'Username and password are required' }, { status: 400 });
    }

    if (username === adminUsername && password === adminPassword) {
      const response = NextResponse.json({ success: true, message: 'Login successful' });
      
      const adminSecret = process.env.ADMIN_SECRET || 'fallback_secret';
      
      response.cookies.set('admin_token', adminSecret, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });
      
      return response;
    }

    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'An error occurred during login' }, { status: 500 });
  }
}
