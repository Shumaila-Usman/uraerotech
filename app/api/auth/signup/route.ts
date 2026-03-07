import { NextRequest, NextResponse } from 'next/server'
import * as bcrypt from 'bcryptjs'
import { UserRole } from '@/types/file-db'
import { fileDb } from '@/lib/file-db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password, role } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = fileDb.findUnique<any>('User', { email })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = fileDb.create('User', {
      email,
      name: name || null,
      password: hashedPassword,
      role: (role as UserRole) || 'B2C',
    })

    return NextResponse.json(
      { 
        success: true, 
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create account' },
      { status: 500 }
    )
  }
}

