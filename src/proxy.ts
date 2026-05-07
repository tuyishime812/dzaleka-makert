import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/cart(.*)',
  '/checkout(.*)',
])

export default async function middleware(req: NextRequest) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  
  if (!publishableKey || publishableKey === 'pk_test_placeholder') {
    return NextResponse.next()
  }
  
  return clerkMiddleware(async (auth, request) => {
    if (isProtectedRoute(request)) {
      await auth.protect()
    }
  })(req as Parameters<typeof clerkMiddleware>[0], {
    /* eslint-disable @typescript-eslint/no-explicit-any */
  } as any)
}

export const config = {
  matcher: [
    '/((?!_next|_image|_static|_vercel|.*\\.svg).*)',
    '/(api|trpc)(.*)',
  ],
}