import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv } from 'vite';
import { DEV_API_URL } from './src/lib/admin/api-origins.ts';

// Admin pages call same-origin /api; in dev it goes to the local redbiiddsun-service (vercel.json does this in production).

export default defineConfig(({ mode }) => ({
  plugins: [tailwindcss(), sveltekit({ adapter: adapter() })],
  server: {
    proxy: {
      '/api': {
        target: loadEnv(mode, '.', 'VITE_').VITE_API_URL || DEV_API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
}));
