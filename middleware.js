import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const path = new URL(request.url).pathname;
  const isAdmin = request.cookies.get('admin')?.value === "true"; // Checking if 'admin' is 'true'

  const isAuthPage = ["/"].includes(path);

  // If the user is logged in and trying to access the auth page, redirect them to the appointment page
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/appointment-page", request.url));
  }

  // If there's no token and the user is trying to access any page other than the auth page, redirect to the home page
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If the path starts with '/admin', only allow access if the 'admin' cookie is 'true'
  if (path.startsWith('/admin') && !isAdmin) {
    console.log('Access Denied: Non-admin user trying to access admin page');
    return NextResponse.redirect(new URL("/", request.url)); // Redirect non-admins
  }

  // For other routes, verify the JWT token as usual
  try {
    if (token) {
      const secret = new TextEncoder().encode(process.env.SECRET_TOKEN);
      await jwtVerify(token, secret); // Verify the JWT token
   }

     return NextResponse.next(); // Proceed if everything is valid
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return NextResponse.redirect(new URL("/", request.url)); // Redirect if JWT verification fails
  }
}

export const config = {
  matcher: [
    "/appointment-page/:path*",
    "/user-profile/:path*",
    "/admin:path*",
    "/"
  ],
};
