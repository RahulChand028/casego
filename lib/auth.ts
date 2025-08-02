import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";

// Type definitions for Better Auth
interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface Session {
  user?: SessionUser;
  expires: string;
}

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

// Check for required environment variables
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.warn("Warning: Missing Google OAuth environment variables. Authentication will not work properly.");
}

// Ensure we have a secret key for session encryption
if (!process.env.AUTH_SECRET) {
  console.warn("Warning: AUTH_SECRET is not set. Using an insecure default for development.");
}

export const auth = betterAuth({
  // Required: A random string used to hash tokens and sign cookies
  secret: process.env.AUTH_SECRET || "dev-secret-change-in-production",
  
  // Database adapter
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  
  // Session configuration
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  
  // Social providers
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  
  // Callbacks
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      if (session.user) {
        // Add user ID to the session
        session.user.id = user.id;
      }
      return session;
    },
  },
});
