// Portfolio content. Projects, screenshots and stats are real (taken from each live site or the App Store).
// Still PLACEHOLDER: roles, years and stacks marked below. Replace before publishing.
import { techIcons } from './tech-icons';
import type { HeroShot, Project, StickyNote, TechLogo, TechName } from './types';

export const OWNER = {
  name: 'Phanasorn Srisayam',
  nickname: 'Sun',
  title: 'Full-stack developer',
  email: 'sun@wedodevwork.com',
};

export const MAILTO_HREF = `mailto:${OWNER.email}?subject=${encodeURIComponent('Project enquiry')}`;

export const avatar = (avatarId: number, size = 160) => `https://i.pravatar.cc/${size}?img=${avatarId}`;

const shot = (projectId: string, file: string) => `/projects/${projectId}/${file}`;

// Image cards are screenshots of the projects below; `art` cards are drawn in HTML (DevArt.svelte).
export const heroShots: HeroShot[] = [
  { side: 'left', offsetX: -1, offsetY: 9, width: 180, height: 190, rotation: -5, depth: 0.6, src: shot('engineeringscore', 'home.webp'), logo: shot('engineeringscore', 'logo.png'), title: 'EngineeringScore', caption: 'SvelteKit · SaaS' },
  { side: 'left', offsetX: 8, offsetY: -5, width: 150, height: 120, rotation: 3, depth: 0.3, art: 'terminal', tech: 'Svelte', title: 'build.log', caption: 'Svelte · build' },
  { side: 'left', offsetX: 14, offsetY: 27, width: 150, height: 180, rotation: 2, depth: 0.9, src: shot('my-isuzu', 'screen-3.webp'), logo: shot('my-isuzu', 'logo.png'), title: 'my-ISUZU', caption: 'Mobile app', isMidLayer: true },
  { side: 'left', offsetX: -1.5, offsetY: 45, width: 200, height: 160, rotation: -3, depth: 0.5, art: 'code', tech: 'NestJS', title: 'orders.controller.ts', caption: 'NestJS', isMidLayer: true },
  { side: 'left', offsetX: 4, offsetY: 68, width: 190, height: 230, rotation: 3, depth: 1, src: shot('pakprik', 'product.webp'), logo: shot('pakprik', 'logo.png'), title: 'PAK PRIK', caption: 'E-commerce' },
  { side: 'right', offsetX: 12, offsetY: -7, width: 150, height: 110, rotation: -3, depth: 0.4, src: shot('willow-court', 'home.webp'), logo: shot('willow-court', 'logo.png'), title: 'Willow Court', caption: 'Demo site' },
  { side: 'right', offsetX: 0, offsetY: 5, width: 160, height: 180, rotation: 4, depth: 0.7, src: shot('sigmalearn', 'past-papers.webp'), logo: shot('sigmalearn', 'logo.svg'), title: 'Sigma Learn', caption: 'Next.js · EdTech' },
  { side: 'right', offsetX: -1, offsetY: 34, width: 200, height: 230, rotation: -2, depth: 0.9, art: 'schema', tech: 'PostgreSQL', title: 'schema.sql', caption: 'PostgreSQL', isMidLayer: true },
  { side: 'right', offsetX: 13, offsetY: 76, width: 150, height: 190, rotation: -2, depth: 0.5, art: 'api', tech: 'TypeScript', title: 'GET /orders/1042', caption: 'TypeScript API' },
  { side: 'right', offsetX: -1, offsetY: 71, width: 180, height: 140, rotation: 3, depth: 0.8, src: shot('portfolio', 'home.webp'), logo: '/favicon.svg', title: 'This portfolio', caption: 'SvelteKit · 2026' },
];

/** Hero tech stack, in display order. */
const HERO_TECH: TechName[] = ['TypeScript', 'NestJS', 'Svelte', 'PostgreSQL'];
export const techStack: TechLogo[] = HERO_TECH.map((name) => ({ name, ...techIcons[name] }));

export const rotatingWords: string[] = ['web apps', 'APIs', 'dashboards', 'mobile apps', 'AI tools'];

export const projects: Project[] = [
  {
    id: 'engineeringscore', label: 'Website audit SaaS',
    name: 'EngineeringScore', logo: shot('engineeringscore', 'logo.png'), url: 'https://engineeringscore.com/',
    summary: 'Scans a website for security, performance, SEO, accessibility and reliability, then scores it with a transparent method.',
    description: 'Scores a site with a transparent, deterministic method and hands back a prioritised roadmap of what to fix first. Free scans check the homepage; paid plans scan up to 25 pages. Delivered by We Do Dev Work.',
    myRole: 'Team member, We Do Dev Work',
    stats: [{ value: '5', label: 'Audit areas' }, { value: '25', label: 'Pages per scan' }, { value: 'Free', label: 'Homepage scan' }, { value: 'Live', label: 'Status' }],
    banner: { type: 'image', src: shot('engineeringscore', 'home.webp') },
    stack: ['SvelteKit', 'Supabase'],
    gallery: [{ src: shot('engineeringscore', 'home.webp'), height: 190, badge: 'Live' }, { src: shot('engineeringscore', 'checks.webp'), height: 230 }, { src: shot('engineeringscore', 'report.webp'), height: 170 }],
    highlights: [
      { title: 'Five-area scan', detail: 'Security, performance, SEO, a11y, reliability', src: shot('engineeringscore', 'checks.webp') },
      { title: 'Prioritised roadmap', detail: 'What to fix first, with a sample report', src: shot('engineeringscore', 'report.webp') },
      { title: 'No signup to start', detail: 'Paste a URL, get a score', src: shot('engineeringscore', 'home.webp') },
    ],
  },
  {
    id: 'my-isuzu', label: 'Mobile app',
    name: 'my-ISUZU', logo: shot('my-isuzu', 'logo.png'), url: 'https://apps.apple.com/th/app/my-isuzu/id1612415578', year: '2022',
    summary: 'Official app for Isuzu owners in Thailand by Tri Petch Isuzu Sales: service booking, vehicle status, coupons and an owner community.',
    description: 'Owners book service appointments, check their vehicle and warranty status, receive e-quotations for repairs, collect my-MEMBER points and coupons, and share experiences in the my-CIRCLE community.',
    myRole: 'Team member',
    stats: [{ value: '4.1★', label: 'App Store' }, { value: '439', label: 'Ratings' }, { value: '2022', label: 'Live since' }, { value: 'v4.17', label: 'Version' }],
    banner: { type: 'gradient', label: 'my-ISUZU' },
    // PLACEHOLDER: add the app's real tech stack.
    stack: [],
    gallery: [1, 2, 3, 4, 5].map((index) => ({ src: shot('my-isuzu', `screen-${index}.webp`), height: 300, badge: index === 1 ? 'App Store' : undefined })),
    highlights: [
      { title: 'Service booking', detail: 'Pick car, centre, date and time', src: shot('my-isuzu', 'screen-3.webp') },
      { title: 'my-MEMBER', detail: 'Points, tiers and coupons', src: shot('my-isuzu', 'screen-2.webp') },
      { title: 'my-CIRCLE', detail: 'Isuzu owner community', src: shot('my-isuzu', 'screen-4.webp') },
    ],
  },
  {
    id: 'sigmalearn', label: 'EdTech + AI',
    name: 'Sigma Learn', logo: shot('sigmalearn', 'logo.svg'), url: 'https://sigmalearn.io/',
    summary: 'Revision platform for IGCSE, A Level, IB, AP and SAT with an AI tutor that knows the page you are on.',
    description: 'Syllabus-mapped courses, past-paper questions marked against the real mark scheme, hands-on simulations, and an AI tutor that explains steps and marks written answers.',
    // PLACEHOLDER: confirm your role.
    myRole: 'Developer',
    stats: [{ value: '51', label: 'Courses' }, { value: '1,760', label: 'Lessons' }, { value: '5', label: 'Curricula' }, { value: 'AI', label: 'Tutor' }],
    banner: { type: 'image', src: shot('sigmalearn', 'home.webp') },
    stack: ['Next.js', 'React'],
    gallery: [{ src: shot('sigmalearn', 'home.webp'), height: 200, badge: 'Live' }, { src: shot('sigmalearn', 'past-papers.webp'), height: 240 }],
    highlights: [
      { title: 'Past papers, marked', detail: 'Against the real mark scheme', src: shot('sigmalearn', 'past-papers.webp') },
      { title: 'AI tutor', detail: 'Knows the lesson you are on', src: shot('sigmalearn', 'home.webp') },
    ],
  },
  {
    id: 'pakprik', label: 'E-commerce',
    name: 'PAK PRIK', logo: shot('pakprik', 'logo.png'), url: 'https://www.pakprik.com',
    summary: 'Online shop for handcrafted Thai curry pastes, built around a family recipe story.',
    description: 'Product catalogue, bundle offers, recipes and the brand story behind the curry paste recipes Grandma Somsri perfected over 60 years, with free shipping on larger orders.',
    // PLACEHOLDER: confirm your role.
    myRole: 'Developer',
    stats: [{ value: '60+', label: 'Years of recipes' }, { value: '฿1,500', label: 'Free-ship threshold' }, { value: 'Shop', label: 'Online store' }, { value: 'Live', label: 'Status' }],
    banner: { type: 'image', src: shot('pakprik', 'home.webp') },
    stack: ['SvelteKit', 'Supabase'],
    gallery: [{ src: shot('pakprik', 'home.webp'), height: 200, badge: 'Live' }, { src: shot('pakprik', 'product.webp'), height: 240 }, { src: shot('pakprik', 'story.webp'), height: 180 }],
    highlights: [
      { title: 'Product showcase', detail: 'Pastes, dishes and bundles', src: shot('pakprik', 'product.webp') },
      { title: 'Brand story', detail: 'A recipe passed down with love', src: shot('pakprik', 'story.webp') },
    ],
  },
  {
    id: 'willow-court', label: 'Demo site', isDemo: true,
    name: 'Willow Court', logo: shot('willow-court', 'logo.png'), url: 'https://tennis-court-rho.vercel.app/',
    summary: 'Demo mockup of a private tennis club site: membership tiers, court booking and English/Thai.',
    description: 'A concept build, not a real club: editorial hero, two membership tiers, a court-booking flow and a full Thai version.',
    myRole: 'Design & build (demo)',
    stats: [{ value: 'Demo', label: 'Mockup' }, { value: 'EN/TH', label: 'Languages' }, { value: '2', label: 'Membership tiers' }, { value: 'Vercel', label: 'Hosting' }],
    banner: { type: 'image', src: shot('willow-court', 'home.webp') },
    stack: ['SvelteKit', 'Vercel'],
    gallery: [{ src: shot('willow-court', 'home.webp'), height: 200, badge: 'Demo' }, { src: shot('willow-court', 'thai.webp'), height: 220 }],
    highlights: [
      { title: 'Editorial hero', detail: 'Full-bleed photo, serif type', src: shot('willow-court', 'home.webp') },
      { title: 'Thai version', detail: 'Every page in EN and TH', src: shot('willow-court', 'thai.webp') },
    ],
  },
  {
    id: 'portfolio', label: 'This portfolio',
    name: 'Portfolio site', logo: '/favicon.svg', year: '2026',
    summary: 'The site you’re on: a scroll-driven, bilingual landing page built as typed Svelte components.',
    description: 'Started as a single imperative script and refactored into typed Svelte 5 components with rune-based i18n, a Memoji intro and a handwritten signature, prerendered to static HTML.',
    myRole: 'Design & engineering',
    stats: [{ value: '2', label: 'Languages' }, { value: '0', label: 'Runtime deps' }, { value: 'Static', label: 'Hosting' }, { value: 'TS', label: 'Typed' }],
    banner: { type: 'type', text: 'SVELTE', emphasis: 'KIT' },
    stack: ['SvelteKit', 'TypeScript'],
    gallery: [{ src: shot('portfolio', 'home.webp'), height: 230, badge: 'Live' }],
    highlights: [
      { title: 'Scroll-driven showcase', detail: 'Pinned section steps through projects', src: shot('portfolio', 'home.webp') },
    ],
  },
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
