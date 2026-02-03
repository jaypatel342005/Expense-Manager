import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySession } from '@/lib/session'

const protectedRoutes = ['/']
const publicRoutes = ['/login', '/signup']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path) || path.startsWith('/dashboard')
  const isPublicRoute = publicRoutes.includes(path)

  const session = await verifySession()

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
  
  if (path.startsWith('/admin') && session?.role !== 'ADMIN') {
     return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  return NextResponse.next()
}


export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
