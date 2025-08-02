import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Handle all auth routes through Better Auth
export const { GET, POST } = toNextJsHandler(auth.handler);


// import { toNodeHandler } from "better-auth/node"
// import { auth } from "@/lib/auth"
 
// // Disallow body parsing, we will parse it manually
// export const config = { api: { bodyParser: false } }
 
// export default toNodeHandler(auth.handler)

// Handle Google OAuth callback
export const dynamic = 'force-dynamic';

// This route will handle:
// GET /api/auth/google - Start Google OAuth flow
// GET /api/auth/callback/google - Handle Google OAuth callback
// POST /api/auth/callback/google - Handle Google OAuth callback (POST)
// All other routes will be handled by the auth.handler
