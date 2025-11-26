// src/app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, generateToken } from '@/lib/auth';
import { findUserByEmail, createUser } from '@/lib/db'; // or '@/lib/auth-db'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user in database
    const user = await createUser({
      email,
      name,
      password: hashedPassword
    });

    // Generate token
    const token = generateToken({
    userId: user.id,
    email: user.email,
    name: user.name ?? ''
  });
    // Return user data (excluding password) and token
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      message: 'User created successfully',
      token,
      user: userWithoutPassword
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}