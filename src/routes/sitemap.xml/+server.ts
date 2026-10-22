import { SITE_URL } from '#lib/data.ts';

export const prerender = true;

// One-page site: the sitemap lists just the home page.
export const GET = () =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}/</loc></url>
</urlset>
`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
