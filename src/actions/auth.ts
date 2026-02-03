'use server'

import { z } from 'zod'
// import { PrismaClient } from '@prisma/client'
import { compare, hash } from 'bcryptjs'
import { createSession, deleteSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
// import { Role } from '@prisma/client' // Commented out to avoid build error if client not updated

// const prisma = new PrismaClient()

const loginSchema = z.object({
  email: z.string().min(1, 'Email or Username is required'),
  password: z.string().min(1, 'Password is required'),
})

const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  const { email: identifier, password } = result.data

  console.log('Login attempt for:', identifier)

  const user = await prisma.users.findFirst({
    where: {
      OR: [
        { EmailAddress: identifier },
        { UserName: identifier }
      ]
    },
  })

  if (!user) {
    console.log('User not found')
    return {
      errors: {
        email: ['Invalid email/username or password'],
      },
    }
  }

  // Check if password matches (bcrypt or plain text fallback)
  const passwordMatch = await compare(password, user.Password)
  const plainTextMatch = password === user.Password

  if (!passwordMatch && !plainTextMatch) {
    console.log('Password mismatch')
    return {
      errors: {
        email: ['Invalid email or password'],
      },
    }
  }

  // Cast user to any to access Role if types are not updated
  const userRole = (user as any).Role || 'USER'
  await createSession(user.UserID.toString(), userRole)
  redirect('/')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}

export async function signup(prevState: any, formData: FormData) {
  const result = signupSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  const { name, email, password } = result.data

  const existingUser = await prisma.users.findUnique({
    where: { EmailAddress: email },
  })

  if (existingUser) {
    return {
      errors: {
        email: ['Email already registered'],
      },
    }
  }

  const hashedPassword = await hash(password, 10)

  // Default role is USER. If you need ADMIN, you'd change this or have a separate admin signup/seed.
  // We use string 'USER' to avoid Enum dependency issues if generator failed
  const user = await prisma.users.create({
    data: {
      UserName: name,
      EmailAddress: email,
      Password: hashedPassword,
      MobileNo: '', // Optional or add field to form
      Role: 'USER', // Default
    } as any, // Cast data to any to avoid type error if Role field is missing in input type
  })

  // Cast user to any to access Role
  const userRole = (user as any).Role || 'USER'
  await createSession(user.UserID.toString(), userRole)
  redirect('/')
}
