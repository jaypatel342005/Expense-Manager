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
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),

  confirmPassword: z.string().min(1, 'Confirm Password is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  const { email: identifier, password } = result.data

  const user = await prisma.users.findFirst({
    where: {
      OR: [
        { EmailAddress: identifier },
        { UserName: identifier }
      ]
    },
  })

  if (!user) {
    return {
      errors: {
        email: ['Invalid email/username or password'],
      },
    }
  }

  const passwordMatch = await compare(password, user.Password)

  if (!passwordMatch) {
    return {
      errors: {
        email: ['Invalid email or password'],
      },
    }
  }

  const userRole = user.Role || 'USER'
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

  const existingEmail = await prisma.users.findUnique({
    where: { EmailAddress: email },
  })

  if (existingEmail) {
    return {
      errors: {
        email: ['User with this email already exists'],
      },
    }
  }

  const existingUsername = await prisma.users.findFirst({
    where: { UserName: name },
  })

  if (existingUsername) {
    return {
      errors: {
        name: ['Username is already taken. Please choose another.'],
      },
    }
  }

  const hashedPassword = await hash(password, 10)

  const user = await prisma.users.create({
    data: {
      UserName: name,
      EmailAddress: email,
      Password: hashedPassword,
      MobileNo: '',
      Role: 'USER',
    },
  })

  const userRole = user.Role || 'USER'
  await createSession(user.UserID.toString(), userRole)
  redirect('/complete-profile')
}
