// Fallback API origin for local development when VITE_API_URL is unset (see .env.example).
// Shared by vite.config.js (dev proxy) and api.ts (OAuth callback URL).
export const DEV_API_URL = 'http://localhost:3000';
