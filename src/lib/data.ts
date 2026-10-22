// Portfolio content. Everything marked PLACEHOLDER is sample copy:
// replace it with your real projects, numbers, screenshots and client quotes before publishing.
import type { HeroShot, Highlight, Project, StickyNote, Testimonial } from './types';

export const OWNER = {
  name: 'Phanasorn Srisayam',
  nickname: 'Sun',
  title: 'Full-stack developer',
  email: 'sun@wedodevwork.com',
};

export const MAILTO_HREF = `mailto:${OWNER.email}?subject=${encodeURIComponent('Project enquiry')}`;

export const img = (seed: string, width: number, height: number) =>
  `https://picsum.photos/seed/${seed}/${width}/${height}`;
export const avatar = (avatarId: number, size = 160) => `https://i.pravatar.cc/${size}?img=${avatarId}`;
/** Gallery tiles render at half the requested height, so fetch at 2x for sharpness. */
export const galleryImage = (seed: string, height: number) => img(seed, 400, height * 2);
export const highlightImage = (highlight: Highlight) => img(highlight.seed, 300, 220);
export const bannerImage = (seed: string) => img(seed, 900, 300);
export const logoImage = (seed: string) => img(seed, 160, 160);
/** Hero shots render at CSS size, so fetch at 2x for sharpness. */
export const heroShotImage = (shot: HeroShot) => img(shot.seed, shot.width * 2, shot.height * 2);

// PLACEHOLDER screenshots: swap seeds for real project images.
export const heroShots: HeroShot[] = [
  { side: 'left', offsetX: -1, offsetY: 9, width: 180, height: 190, rotation: -5, depth: 0.6, seed: 'dashboard-ui', title: 'Pulse Analytics', caption: 'SvelteKit · 2025' },
  { side: 'left', offsetX: 8, offsetY: -5, width: 150, height: 120, rotation: 3, depth: 0.3, seed: 'studio-desk', title: 'Dev setup', caption: 'Bangkok' },
  { side: 'left', offsetX: 14, offsetY: 27, width: 150, height: 180, rotation: 2, depth: 0.9, seed: 'phone-landing', title: 'Queue', caption: 'React Native · 2025', isMidLayer: true },
  { side: 'left', offsetX: -1.5, offsetY: 45, width: 200, height: 160, rotation: -3, depth: 0.5, seed: 'resort-site', title: 'Resort booking', caption: 'Next.js · 2024', isMidLayer: true },
  { side: 'left', offsetX: 4, offsetY: 68, width: 190, height: 230, rotation: 3, depth: 1, seed: 'shop-mock', title: 'Mercado shop', caption: 'E-commerce · 2024' },
  { side: 'right', offsetX: 12, offsetY: -7, width: 150, height: 110, rotation: -3, depth: 0.4, seed: 'server-green', title: 'Platform API', caption: 'Node.js · 2025' },
  { side: 'right', offsetX: 0, offsetY: 5, width: 160, height: 180, rotation: 4, depth: 0.7, seed: 'glass-ui', title: 'Helpdesk AI', caption: 'LLM · 2025' },
  { side: 'right', offsetX: -1, offsetY: 34, width: 200, height: 230, rotation: -2, depth: 0.9, seed: 'cafe-site', title: 'Café site', caption: 'Svelte · 2024', isMidLayer: true },
  { side: 'right', offsetX: 13, offsetY: 76, width: 150, height: 190, rotation: -2, depth: 0.5, seed: 'brand-cards', title: 'Design system', caption: 'Figma → code' },
  { side: 'right', offsetX: -1, offsetY: 71, width: 180, height: 140, rotation: 3, depth: 0.8, seed: 'poster-grid', title: 'This portfolio', caption: 'SvelteKit · 2026' },
];

export const rotatingWords: string[] = ['web apps', 'APIs', 'dashboards', 'mobile apps', 'AI tools'];

export const projects: Project[] = [
  {
    id: 'portfolio', label: 'This portfolio',
    name: 'Portfolio site', logoSeed: 'poster-grid', year: '2026',
    summary: 'The site you’re on: a scroll-driven, bilingual landing page built as typed Svelte components.',
    description: 'Started as a single imperative script and refactored into 18 typed Svelte 5 components with rune-based i18n, prerendered to static HTML.',
    myRole: 'Design & engineering',
    stats: [{ value: '18', label: 'Components' }, { value: '2', label: 'Languages' }, { value: '0', label: 'Runtime deps' }, { value: 'Static', label: 'Hosting' }],
    banner: { type: 'type', text: 'SVELTE', emphasis: 'KIT' },
    stack: ['SvelteKit', 'TypeScript', 'CSS animation'],
    gallery: [{ seed: 'poster-grid', height: 250 }, { seed: 'phone-landing', height: 200 }, { seed: 'brand-cards', height: 140, badge: 'Live' }, { seed: 'glass-ui', height: 180 }],
    highlights: [
      { title: 'Scroll-driven showcase', detail: 'Pinned section steps through projects', seed: 'glass-ui' },
      { title: 'English / Thai', detail: 'Reactive i18n with saved preference', seed: 'brand-cards' },
      { title: 'Prerendered', detail: 'Static HTML, hydrated on load', seed: 'server-green' },
    ],
  },
  // PLACEHOLDER projects below: replace with real work.
  {
    id: 'pulse-analytics', label: 'SaaS dashboard',
    name: 'Pulse Analytics', logoSeed: 'dashboard-ui', year: '2025',
    summary: 'Real-time analytics dashboard for a B2B SaaS product.',
    description: 'Multi-tenant dashboard with live charts, role-based access and CSV exports.',
    myRole: 'Full-stack lead',
    stats: [{ value: '12K', label: 'Users' }, { value: '40ms', label: 'p95 API' }, { value: '3', label: 'Months' }, { value: '99.9%', label: 'Uptime' }],
    banner: { type: 'image', seed: 'dashboard-ui' },
    stack: ['SvelteKit', 'PostgreSQL', 'WebSockets'],
    gallery: [{ seed: 'dashboard-ui', height: 190 }, { seed: 'grade-before', height: 250, badge: 'Live' }, { seed: 'studio-desk', height: 140 }, { seed: 'glass-ui', height: 160 }, { seed: 'server-stack', height: 210 }],
    highlights: [
      { title: 'Live charts', detail: 'Streaming updates over WebSockets', seed: 'grade-before' },
      { title: 'Team permissions', detail: 'Roles and audit log', seed: 'studio-desk' },
      { title: 'Exports', detail: 'CSV and scheduled email reports', seed: 'server-stack' },
    ],
  },
  {
    id: 'mercado-shop', label: 'E-commerce',
    name: 'Mercado Shop', logoSeed: 'shop-mock', year: '2024',
    summary: 'Storefront and back office for an independent retailer.',
    description: 'Headless storefront with Stripe checkout, inventory sync and an admin for orders and refunds.',
    myRole: 'Full-stack developer',
    stats: [{ value: '+38%', label: 'Conversion' }, { value: '1.1s', label: 'LCP' }, { value: '2K', label: 'SKUs' }, { value: '24/7', label: 'Orders' }],
    banner: { type: 'image', seed: 'shop-mock' },
    stack: ['Next.js', 'Stripe', 'Prisma'],
    gallery: [{ seed: 'shop-mock', height: 240 }, { seed: 'packaging', height: 150 }, { seed: 'cafe-site', height: 180, badge: 'Live' }, { seed: 'sticker-pack', height: 210 }],
    highlights: [
      { title: 'One-page checkout', detail: 'Stripe Payment Element', seed: 'packaging' },
      { title: 'Inventory sync', detail: 'Nightly sync with the POS', seed: 'sticker-pack' },
      { title: 'Admin', detail: 'Orders, refunds and discounts', seed: 'dashboard-ui' },
    ],
  },
  {
    id: 'queue-app', label: 'Mobile app',
    name: 'Queue', logoSeed: 'phone-landing', year: '2025',
    summary: 'Booking and queue app for clinics, on iOS and Android.',
    description: 'Expo app with push reminders, offline-first booking and a web dashboard for staff.',
    myRole: 'Mobile + backend',
    stats: [{ value: '4.8★', label: 'Store rating' }, { value: '15', label: 'Clinics' }, { value: '-60%', label: 'Wait time' }, { value: '2', label: 'Platforms' }],
    banner: { type: 'gradient', label: 'iOS · Android' },
    stack: ['React Native', 'Expo', 'Supabase'],
    gallery: [{ seed: 'phone-landing', height: 260 }, { seed: 'creator-cam', height: 150 }, { seed: 'warm-interior', height: 190 }, { seed: 'glass-ui', height: 140, badge: 'App Store' }],
    highlights: [
      { title: 'Offline-first', detail: 'Books even with no signal', seed: 'creator-cam' },
      { title: 'Push reminders', detail: 'Fewer no-shows', seed: 'warm-interior' },
    ],
  },
  {
    id: 'helpdesk-ai', label: 'AI tool',
    name: 'Helpdesk AI', logoSeed: 'server-stack', year: '2025',
    summary: 'Support assistant that answers from a company’s own docs.',
    description: 'Retrieval-augmented chatbot with source citations, human handoff and an admin to manage documents.',
    myRole: 'Full-stack developer',
    stats: [{ value: '70%', label: 'Auto-resolved' }, { value: '<2s', label: 'Answer time' }, { value: '5K', label: 'Docs indexed' }, { value: 'EN/TH', label: 'Languages' }],
    banner: { type: 'gradient', label: 'AI assistant' },
    stack: ['Python', 'Claude API', 'RAG'],
    gallery: [
      { caseStudy: { seed: 'server-stack', title: 'Answering from your own docs', excerpt: 'How retrieval and citations keep answers grounded in what the company actually wrote.', readMinutes: 4 } },
      { seed: 'server-green', height: 130 }, { seed: 'glass-ui', height: 185, badge: 'Beta' }, { seed: 'conference-badge', height: 230 },
    ],
    highlights: [
      { title: 'Cited answers', detail: 'Every reply links its source', seed: 'server-green' },
      { title: 'Human handoff', detail: 'Escalates to the support inbox', seed: 'glass-ui' },
    ],
  },
  {
    id: 'platform-api', label: 'API & backend',
    name: 'Platform API', logoSeed: 'server-green', year: '2024',
    summary: 'Public REST API and webhooks for a logistics platform.',
    description: 'Versioned REST API with OAuth, rate limiting, webhooks and generated docs.',
    myRole: 'Backend lead',
    stats: [{ value: '30M', label: 'Requests/mo' }, { value: '99.95%', label: 'Uptime' }, { value: '120', label: 'Endpoints' }, { value: '18', label: 'Integrations' }],
    banner: { type: 'type', text: 'REST', emphasis: 'API' },
    stack: ['Node.js', 'PostgreSQL', 'Docker'],
    gallery: [{ seed: 'server-green', height: 170 }, { seed: 'drone-coast', height: 240 }, { seed: 'silver-car', height: 140, badge: 'v2' }, { seed: 'city-tower', height: 200 }],
    highlights: [
      { title: 'OAuth & API keys', detail: 'Scoped access per partner', seed: 'silver-car' },
      { title: 'Webhooks', detail: 'Signed, retried, replayable', seed: 'drone-coast' },
      { title: 'Generated docs', detail: 'OpenAPI spec and examples', seed: 'city-tower' },
    ],
  },
];

// PLACEHOLDER testimonials: replace with real client quotes (with their permission).
export const testimonials: Testimonial[] = [
  { name: 'Hannah Kim', avatarId: 32, text: 'Shipped exactly what we scoped, on time, and explained every trade-off.', title: 'Product lead' },
  { name: 'Elena Rossi', avatarId: 45, text: 'Fast replies, clean code, and a weekly demo we could actually click.', title: 'Founder' },
  { name: 'Maya Chen', avatarId: 49, text: 'Took our messy MVP to something we could sell. Would hire again.', title: 'CEO' },
  { name: 'Linh Tran', avatarId: 41, text: 'Frontend and backend from one person — no handoff gaps.', title: 'CTO' },
  { name: 'Tom Walker', avatarId: 14, text: 'Our API went from flaky to boring. Boring is great.', title: 'Engineering manager' },
];

export const notes: StickyNote[] = [
  { color: '#b5efc4', leftPercent: 22, topPx: 30, rotation: -3, text: { en: 'Our MVP has been “almost done” for six months.', th: 'MVP “ใกล้เสร็จแล้ว” มาหกเดือน' } },
  { color: '#d4c2fb', leftPercent: 39, topPx: 50, rotation: 4, text: { en: 'The site is so slow on mobile...', th: 'เว็บช้ามากบนมือถือ...' } },
  { color: '#ffb3a7', leftPercent: 56, topPx: 0, rotation: -2, text: { en: 'Nobody knows how the backend works anymore.', th: 'ไม่มีใครรู้แล้วว่าหลังบ้านทำงานยังไง' } },
  { color: '#ffd1e3', leftPercent: 78, topPx: 20, rotation: 6, text: { en: 'Deploys break. Every. Friday.', th: 'ดีพลอยพัง ทุกวันศุกร์' } },
  { color: '#d4c2fb', leftPercent: 0, topPx: 240, rotation: -4, text: { en: 'We need an API by next sprint.', th: 'ต้องมี API ภายในสปรินต์หน้า' } },
  { color: '#fde09a', leftPercent: 29, topPx: 235, rotation: 2, text: { en: 'It looks nothing like the Figma...', th: 'ออกมาไม่เหมือนใน Figma เลย...' } },
  { color: '#b4f0ec', leftPercent: 47, topPx: 215, rotation: -3, text: { en: 'Can we add AI to this?', th: 'ใส่ AI เข้าไปได้ไหม?' } },
  { color: '#e5e5e5', leftPercent: 80, topPx: 245, rotation: -6, text: { en: 'Checkout keeps failing...', th: 'หน้าชำระเงินพังอีกแล้ว...' } },
];
