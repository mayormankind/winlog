import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/brags", "/profile", "/settings", "/change-password"];
const authRoutes = ["/signin", "/signup", "/forgot-password"];
const publicRoutes = ["/"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Supabase stores session tokens in cookies prefixed with "sb-"
  const hasSession = request.cookies.getAll().some(
    (c) => c.name.startsWith("sb-")
  );

  const isProtected = protectedRoutes.some((r) => pathname.startsWith(r));
  const isAuthPage = authRoutes.some((r) => pathname.startsWith(r));
  const isPublicPage = publicRoutes.some((r) => pathname === r);

  if (isProtected && !hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthPage && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
