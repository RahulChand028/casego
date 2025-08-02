import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function middleware(request: NextRequest) {
    // try {
    //     // Dynamic import to avoid build-time issues
    //     const { auth } = await import("@/lib/auth");
        
    //     const session = await auth.api.getSession({
    //         headers: await headers()
    //     });

    //     if (!session) {
    //         return NextResponse.redirect(new URL("/onboard", request.url));
    //     }

    //     return NextResponse.next();
    // } catch (error) {
    //     console.error("Middleware error:", error);
    //     // If there's an error with auth, redirect to onboard for safety
    //     return NextResponse.redirect(new URL("/onboard", request.url));
    // }
    return NextResponse.next();
}
 
export const config = {
  runtime: "nodejs",
  //matcher: ["/dashboard"], // Apply middleware to specific routes
};