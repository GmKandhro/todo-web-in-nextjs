import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value.toString() || ""

    const publicpath = pathname === '/signup' || pathname === '/signin' || pathname === '/verify'
    if(token && publicpath){
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    if(!token && !publicpath ){
        return NextResponse.redirect(new URL('/', request.url))
    }
}
 
export const config = {
  matcher: ["/signup","/signin","/dashboard","/verify","/"]
}
