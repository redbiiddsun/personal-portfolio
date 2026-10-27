import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { LOCAL_API_URL } from './src/lib/admin/api-origins.ts';

// Admin pages call same-origin /api; in dev it goes to the local redbiiddsun-service (vercel.json does this in production).

export default defineConfig({
  plugins: [tailwindcss(), sveltekit({ adapter: adapter() })],
  server: {
    proxy: {
      '/api': { target: LOCAL_API_URL, changeOrigin: true, rewrite: (path) => path.replace(/^\/api/, '') },
    },
  },
});
