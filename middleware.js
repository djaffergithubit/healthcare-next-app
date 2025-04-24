import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const path = new URL(request.url).pathname;

  const isAuthPage = ["/"].includes(path);

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/appointment-page", request.url));
  }

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    if (token) {
      const secret = new TextEncoder().encode(process.env.SECRET_TOKEN);
      await jwtVerify(token, secret);
    }

    return NextResponse.next(); 
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/appointment-page/:path*",
    "/user-profile/:path*",
    "/"
  ],
};
