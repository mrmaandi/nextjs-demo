import { NextFetchEvent, NextRequest, NextResponse } from "next/server"

const protectedRoutes = ['/user-comments', '/user-posts']

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (!protectedRoutes.includes(new URL(req.url).pathname)) {
    return NextResponse.next()
  }

  const cookies = req.cookies;
  const sessionTokenCookie =
    cookies["next-auth.session-token"] ||
    cookies["__Secure-next-auth.session-token"];

  const url = req.nextUrl.clone()
  url.pathname = '/api/auth/signin'

  if (!sessionTokenCookie) return NextResponse.redirect(url)

  return NextResponse.next()
}
