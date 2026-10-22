import { SITE_URL } from '#lib/data.ts';

export const prerender = true;

export const GET = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`, {
    headers: { 'Content-Type': 'text/plain' },
  });
