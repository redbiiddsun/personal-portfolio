// Placeholder content. Every person, handle and number here is fictional —
// swap in real freelancers / assets before shipping.
import type { HeroCard, Review, Role, Service, StickyNote } from './types';

export const img = (seed: string, width: number, height: number) =>
  `https://picsum.photos/seed/${seed}/${width}/${height}`;
export const avatar = (avatarId: number, size = 160) => `https://i.pravatar.cc/${size}?img=${avatarId}`;
/** Portfolio tiles render at half the requested height, so fetch at 2x for sharpness. */
export const portfolioImage = (seed: string, height: number) => img(seed, 400, height * 2);
export const serviceImage = (service: Service) => img(service.seed, 300, 220);
export const bannerImage = (seed: string) => img(seed, 900, 300);

export const heroCards: HeroCard[] = [
  { side: 'left', offsetX: -1, offsetY: 9, width: 180, height: 190, rotation: -5, depth: 0.6, isVinyl: true, name: 'Niran Vatanakul', role: 'Sound Composer', city: 'Bangkok', avatarId: 12 },
  { side: 'left', offsetX: 8, offsetY: -5, width: 150, height: 120, rotation: 3, depth: 0.3, seed: 'studio-desk', name: 'Leo Barker', role: 'AI Video Editor', city: 'Bangkok', avatarId: 15 },
  { side: 'left', offsetX: 14, offsetY: 27, width: 150, height: 180, rotation: 2, depth: 0.9, seed: 'ink-portrait', name: 'Kwan Ladda', role: 'Illustrator', city: 'Chiang Mai', avatarId: 47, isMidLayer: true },
  { side: 'left', offsetX: -1.5, offsetY: 45, width: 200, height: 160, rotation: -3, depth: 0.5, seed: 'resort-site', name: 'Arnold Suriya', role: 'Web Designer', city: 'Bangkok', avatarId: 33, isMidLayer: true },
  { side: 'left', offsetX: 4, offsetY: 68, width: 190, height: 230, rotation: 3, depth: 1, seed: 'red-dress', name: 'Mali Chen', role: 'Fashion Photographer', city: 'Bangkok', avatarId: 44 },
  { side: 'right', offsetX: 12, offsetY: -7, width: 150, height: 110, rotation: -3, depth: 0.4, seed: 'packaging', name: 'Butter Cup', role: 'Packaging Designer', city: 'Bangkok', avatarId: 5 },
  { side: 'right', offsetX: 0, offsetY: 5, width: 160, height: 180, rotation: 4, depth: 0.7, seed: 'warm-interior', name: 'Peter Sato', role: 'Interior Designer', city: 'Osaka', avatarId: 53 },
  { side: 'right', offsetX: -1, offsetY: 34, width: 200, height: 230, rotation: -2, depth: 0.9, seed: 'wedding-light', name: 'Nguyen Van Nam', role: 'Wedding Photographer', city: 'Ho Chi Minh', avatarId: 59, isMidLayer: true },
  { side: 'right', offsetX: 13, offsetY: 76, width: 150, height: 190, rotation: -2, depth: 0.5, seed: 'city-tower', name: 'Sora Kim', role: '3D Artist', city: 'Seoul', avatarId: 25 },
  { side: 'right', offsetX: -1, offsetY: 71, width: 180, height: 140, rotation: 3, depth: 0.8, seed: 'silver-car', name: 'Mod Supacha', role: 'Graphic Designer', city: 'Bangkok', avatarId: 68 },
];

export const rotatingWords: string[] = ['you', 'คุณ', 'あなた', '你', '당신', 'vous', 'du'];

export const roles: Role[] = [
  {
    id: 'sound-composer', role: 'Sound Composer',
    name: 'Niran Vatanakul', handle: 'niran_sound', followers: '142K', avatarId: 12,
    bio: 'Film composer with award-winning scores for features, series and documentaries across Thailand and Asia.',
    stats: { earned: '฿5M+', orders: 104, rehires: 45, rating: 4.8 },
    banner: { type: 'composer' },
    tags: ['Film Scoring', 'Original Soundtrack', 'Sound Design'], city: 'Bangkok, Thailand',
    portfolio: [{ seed: 'poster-smile', height: 260 }, { seed: 'forest-poster', height: 278 }, { seed: 'orchestra-bw', height: 124 }, { isVinyl: true }],
    services: [
      { title: 'Custom Short Film Score', price: '฿15,000', soldCount: 18, rating: 4.8, ratingCount: 14, seed: 'score-sheet' },
      { title: 'Feature Film / Series Score', price: '฿500,000', soldCount: 12, rating: 5.0, ratingCount: 10, seed: 'forest-poster' },
      { title: 'Original Soundtrack & Theme Song', price: '฿60,000', soldCount: 22, rating: 4.9, ratingCount: 17, seed: 'mixing-desk' },
    ],
    skills: ['Orchestration', 'Logic Pro', 'Live recording', 'Mixing'],
  },
  {
    id: 'photographer', role: 'Photographer',
    name: 'Karn Phromma', handle: 'karn.shoots', followers: '48K', avatarId: 51,
    bio: 'Creative / Social Media / Production House / Website / KOL / Event',
    stats: { earned: '฿4.2M', orders: 96, rehires: 38, rating: 4.9 },
    banner: { type: 'image', seed: 'moto-rider' },
    tags: ['Photography', 'Production House', 'Social Media'], city: 'Bangkok, Thailand',
    portfolio: [{ seed: 'beauty-pink', height: 245 }, { seed: 'red-texture', height: 160 }, { seed: 'night-ball', height: 105 }, { seed: 'chef-cut', height: 230 }, { seed: 'runway-blur', height: 245 }, { seed: 'bob-hair', height: 170 }],
    services: [
      { title: 'Commercial & Product Shoot', price: '฿35,000', soldCount: 24, rating: 4.9, ratingCount: 18, seed: 'bw-portrait' },
      { title: 'Fashion & Lookbook', price: '฿45,000', soldCount: 9, rating: 5.0, ratingCount: 7, seed: 'beauty-pink' },
      { title: 'Event & Social Media', price: '฿18,000 / day', soldCount: 31, rating: 4.8, ratingCount: 22, seed: 'night-ball' },
    ],
    skills: ['Lighting', 'Retouching', 'Art direction', 'Capture One'],
  },
  {
    id: 'video-editor', role: 'Video Editor',
    name: 'Leo Barker', handle: 'leo.cuts', followers: '63K', avatarId: 15,
    bio: 'AI-assisted video editor for brands, creators and short-form campaigns.',
    stats: { earned: '฿2.8M', orders: 210, rehires: 77, rating: 4.9 },
    banner: { type: 'image', seed: 'film-set' },
    tags: ['Short-form', 'Color Grading', 'Motion'], city: 'Bangkok, Thailand',
    portfolio: [{ seed: 'reel-neon', height: 300, price: '฿6,500' }, { seed: 'drone-coast', height: 120 }, { seed: 'studio-desk', height: 180 }, { seed: 'creator-cam', height: 260 }, { seed: 'grade-before', height: 140 }],
    services: [
      { title: 'Reels / TikTok Edit Pack (5 clips)', price: '฿6,500', soldCount: 88, rating: 4.9, ratingCount: 61, seed: 'reel-neon' },
      { title: 'YouTube Long-form Edit', price: '฿12,000', soldCount: 40, rating: 4.8, ratingCount: 29, seed: 'creator-cam' },
      { title: 'Brand Film, Cut & Grade', price: '฿80,000', soldCount: 7, rating: 5.0, ratingCount: 6, seed: 'film-set' },
    ],
    skills: ['Premiere Pro', 'DaVinci Resolve', 'After Effects', 'Runway'],
  },
  {
    id: 'graphic-designer', role: 'Graphic Designer',
    name: 'Mod Supacha', handle: 'modsupacha', followers: '21K', avatarId: 68,
    bio: 'Brand identities, packaging and key visuals with a bold, playful edge.',
    stats: { earned: '฿1.9M', orders: 154, rehires: 61, rating: 4.9 },
    banner: { type: 'image', seed: 'silver-car' },
    tags: ['Branding', 'Packaging', 'Key Visual'], city: 'Bangkok, Thailand',
    portfolio: [{ seed: 'packaging', height: 190 }, { seed: 'poster-grid', height: 250, price: '฿12,000' }, { seed: 'brand-cards', height: 140 }, { seed: 'silver-car', height: 160 }, { seed: 'sticker-pack', height: 210 }],
    services: [
      { title: 'Logo & Brand Identity', price: '฿18,000', soldCount: 52, rating: 4.9, ratingCount: 40, seed: 'brand-cards' },
      { title: 'Packaging Design', price: '฿25,000', soldCount: 19, rating: 4.9, ratingCount: 15, seed: 'packaging' },
      { title: 'Social Media Design Pack', price: '฿12,000', soldCount: 63, rating: 4.8, ratingCount: 47, seed: 'poster-grid' },
    ],
    skills: ['Illustrator', 'Figma', 'Typography', 'Print production'],
  },
  {
    id: 'ai-automation', role: 'AI Automation',
    name: 'Pakorn Siri', handle: 'pakorn.ai', followers: '1.2K', avatarId: 60,
    bio: 'AI agents that get work done.',
    stats: { earned: '฿2.5M', orders: 100, rehires: 10, rating: 4.9 },
    banner: { type: 'ai' },
    tags: ['AI Agents', 'Automation', 'LLM'], city: 'Bangkok, Thailand',
    portfolio: [
      { article: { seed: 'server-stack', title: 'Efficient local LLM on one GPU box', excerpt: 'Upload a document, ask in plain language, get answers that never leave your office.', readMinutes: 4 } },
      { seed: 'server-green', height: 130 }, { seed: 'glass-ui', height: 185, price: '฿35,000' }, { seed: 'conference-badge', height: 230 },
    ],
    services: [
      { title: 'AI Automation Setup', price: '฿10,000', soldCount: 45, rating: 4.8, ratingCount: 12, seed: 'server-green' },
      { title: 'Custom AI Chatbot', price: '฿35,000', soldCount: 20, rating: 4.9, ratingCount: 8, seed: 'glass-ui' },
    ],
    skills: ['Python', 'n8n', 'RAG', 'Agent workflows'],
  },
  {
    id: 'web-developer', role: 'Web Developer',
    name: 'Pixel & Co.', handle: 'pixelandco', followers: '8.4K', avatarId: 8,
    bio: 'One-page sites, sales pages and e-commerce builds that convert.',
    stats: { earned: '฿3.1M', orders: 188, rehires: 64, rating: 4.9 },
    banner: { type: 'image', seed: 'resort-site' },
    tags: ['Web Design', 'E-commerce', 'Landing Page'], city: 'Bangkok, Thailand',
    portfolio: [{ seed: 'resort-site', height: 150 }, { seed: 'shop-mock', height: 240, price: '฿45,000' }, { seed: 'dashboard-ui', height: 170 }, { seed: 'phone-landing', height: 260 }, { seed: 'cafe-site', height: 130 }],
    services: [
      { title: 'One-Page Website, Sales Page', price: '฿15,000', soldCount: 71, rating: 4.9, ratingCount: 58, seed: 'phone-landing' },
      { title: 'E-Commerce & Corporate Websites', price: '฿45,000', soldCount: 26, rating: 4.9, ratingCount: 21, seed: 'shop-mock' },
      { title: 'Website Care Plan', price: '฿3,500 / mo', soldCount: 34, rating: 5.0, ratingCount: 19, seed: 'dashboard-ui' },
    ],
    skills: ['Next.js', 'Webflow', 'Shopify', 'SEO'],
  },
];

export const reviewsPool: Review[] = [
  { name: 'Hannah Kim', avatarId: 32, text: 'The profile sold me. Delivery matched every review.', postedAgo: '2 weeks ago' },
  { name: 'Elena Rossi', avatarId: 45, text: 'Fast replies, strong craft, and proof I could verify.', postedAgo: '1 month ago' },
  { name: 'Maya Chen', avatarId: 49, text: 'Clear brief, polished delivery — I’d hire them again.', postedAgo: '1 month ago' },
  { name: 'Linh Tran', avatarId: 41, text: 'Honest reviews plus real samples — no guessing.', postedAgo: '2 months ago' },
  { name: 'Tom Walker', avatarId: 14, text: 'Handled three rounds of feedback without a single missed date.', postedAgo: '3 months ago' },
];

export const notes: StickyNote[] = [
  { color: '#b5efc4', leftPercent: 22, topPx: 30, rotation: -3, text: { en: 'I use 3 different messengers to talk with different clients.', th: 'คุยกับลูกค้าแต่ละคน ต้องใช้แชตตั้ง 3 แอป' } },
  { color: '#d4c2fb', leftPercent: 39, topPx: 50, rotation: 4, text: { en: 'The client still hasn’t paid...', th: 'ลูกค้ายังไม่โอนเลย...' } },
  { color: '#ffb3a7', leftPercent: 56, topPx: 0, rotation: -2, text: { en: 'Where should I keep my paperwork?', th: 'เอกสารงานเก็บไว้ที่ไหนดี?' } },
  { color: '#ffd1e3', leftPercent: 78, topPx: 20, rotation: 6, text: { en: 'Chasing invoices. Again.', th: 'ตามใบแจ้งหนี้อีกแล้ว' } },
  { color: '#d4c2fb', leftPercent: 0, topPx: 240, rotation: -4, text: { en: 'How do clients pay me?', th: 'ลูกค้าจะจ่ายเงินเรายังไง?' } },
  { color: '#fde09a', leftPercent: 29, topPx: 235, rotation: 2, text: { en: 'I don’t have any reviews to build credibility...', th: 'ยังไม่มีรีวิวให้ลูกค้าเชื่อใจเลย...' } },
  { color: '#b4f0ec', leftPercent: 47, topPx: 215, rotation: -3, text: { en: 'How do I build a portfolio website?', th: 'ทำเว็บพอร์ตโฟลิโอยังไง?' } },
  { color: '#e5e5e5', leftPercent: 80, topPx: 245, rotation: -6, text: { en: 'Another quotation to make...', th: 'ต้องทำใบเสนอราคาอีกแล้ว...' } },
];
