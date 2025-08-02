
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    basePath: '/api/auth',
  });
  