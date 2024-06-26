// middleware.js
import { NextResponse } from 'next/server'

export function middleware(req) {
  const token = req.cookies.get('token')
  const url = req.nextUrl.clone()

  if (url.pathname === '/login' && token) {
    url.pathname = '/dashboard' // Redirect to dashboard if already logged in
    return NextResponse.redirect(url)
  }

  if (!token && url.pathname.startsWith('/protected')) {
    url.pathname = '/login' // Redirect to login if not authenticated
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/protected/:path*'],
}
