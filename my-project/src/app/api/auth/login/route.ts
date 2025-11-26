// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, generateToken } from '@/lib/auth';
import { findUserByEmail } from '@/lib/db'; // or '@/lib/auth-db'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user in database
    const user = await findUserByEmail(email);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      name: user.name ?? ''
    });

    // Return user data (excluding password) and token
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      message: 'Login successful',
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}