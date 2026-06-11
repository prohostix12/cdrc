import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Simple hardcoded credentials
    const ADMIN_EMAIL = 'admin@cdrc.edu.in';
    const ADMIN_PASSWORD = 'cdrc@2025';

    if (email?.trim().toLowerCase() === ADMIN_EMAIL && password?.trim() === ADMIN_PASSWORD) {
      // Create a simple session token
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
      
      return NextResponse.json({
        success: true,
        message: 'Login successful',
        token,
        user: { email }
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
