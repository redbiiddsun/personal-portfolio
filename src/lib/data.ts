// Portfolio content. Projects, screenshots and stats are real (taken from each live site or the App Store).
import { MAIL_ICON, techIcons } from './tech-icons';
import type { HeroImageShot, HeroShot, Job, LocalText, Project, Social, StackLayer, TechKey } from './types';

export const OWNER = {
  name: 'Phanasorn Srisayam',
  nickname: 'Sun',
  title: 'Full-stack developer',
  email: 'sunphanasorn@gmail.com',
};

/** Public origin, no trailing slash; used for canonical, Open Graph and the sitemap. */
export const SITE_URL = 'https://personal-portfolio-one-phi-57.vercel.app';
/** SEO copy stays English: the prerendered HTML is English, Thai is applied on the client. */
export const SITE_DESCRIPTION = `${OWNER.name} (${OWNER.nickname}), a full-stack developer building web apps, APIs and mobile apps end to end.`;
export const OG_IMAGE = { src: '/og.jpg', width: 1200, height: 630, alt: 'portfolio hero' };
export const LOGO_SRC = '/logo.webp';

/** The subject is read by the owner, not the visitor, so it stays English for one inbox filter. */
export const MAILTO_HREF = `mailto:${OWNER.email}?subject=${encodeURIComponent('Project enquiry')}`;

/** Self-hosted stock portraits beside the "people" heading. */
export const PEOPLE_AVATARS = ['/people/avatar-44.jpg', '/people/avatar-12.jpg', '/people/avatar-59.jpg'];

const shot = (projectId: string, file: string) => `/projects/${projectId}/${file}`;

const PROJECT_URLS = {
  engineeringscore: 'https://engineeringscore.com/',
  myIsuzu: 'https://apps.apple.com/th/app/my-isuzu/id1612415578',
  sigmalearn: 'https://sigmalearn.io/',
  pakprik: 'https://www.pakprik.com/',
};

export const rotatingWords: LocalText[] = [
  { en: 'web apps', th: 'เว็บแอป' },
  'APIs',
  { en: 'dashboards', th: 'แดชบอร์ด' },
  { en: 'mobile apps', th: 'แอปมือถือ' },
  { en: 'AI tools', th: 'เครื่องมือ AI' },
];

export const projects: Project[] = [
  {
    id: 'engineeringscore', label: { en: 'Website audit SaaS', th: 'SaaS ตรวจเว็บไซต์' },
    name: 'EngineeringScore', logo: shot('engineeringscore', 'logo.png'), url: PROJECT_URLS.engineeringscore,
    summary: {
      en: 'Scans a website for security, performance, SEO, accessibility and reliability, then scores it with a transparent method.',
      th: 'สแกนเว็บไซต์ด้านความปลอดภัย ประสิทธิภาพ SEO การเข้าถึง และความเสถียร แล้วให้คะแนนด้วยวิธีที่โปร่งใส',
    },
    description: {
      en: 'Scores a site with a transparent, deterministic method and hands back a prioritised roadmap of what to fix first. Free scans check the homepage; paid plans scan up to 25 pages. Delivered by We Do Dev Work.',
      th: 'ให้คะแนนเว็บไซต์ด้วยวิธีที่โปร่งใสและให้ผลเหมือนเดิมทุกครั้ง พร้อมแผนว่าควรแก้อะไรก่อน สแกนฟรีตรวจหน้าแรก แพ็กเกจแบบชำระเงินสแกนได้สูงสุด 25 หน้า พัฒนาโดย We Do Dev Work',
    },
    myRole: 'Software Engineer, We Do Dev Work', year: '2026',
    stats: [
      { value: '5', label: { en: 'Audit areas', th: 'ด้านที่ตรวจ' } },
      { value: '25', label: { en: 'Pages per scan', th: 'หน้าต่อการสแกน' } },
      { value: { en: 'Free', th: 'ฟรี' }, label: { en: 'Homepage scan', th: 'สแกนหน้าแรก' } },
      { value: { en: 'Live', th: 'ใช้งานจริง' }, label: { en: 'Status', th: 'สถานะ' } },
    ],
    stack: ['SvelteKit', 'Supabase'],
    gallery: [shot('engineeringscore', 'home.webp'), shot('engineeringscore', 'checks.webp'), shot('engineeringscore', 'report.webp')],
    highlights: [
      { title: { en: 'Five-area scan', th: 'สแกน 5 ด้าน' }, detail: { en: 'Security, performance, SEO, a11y, reliability', th: 'ความปลอดภัย ประสิทธิภาพ SEO การเข้าถึง ความเสถียร' }, src: shot('engineeringscore', 'checks.webp') },
      { title: { en: 'Prioritised roadmap', th: 'แผนแก้ไขตามลำดับความสำคัญ' }, detail: { en: 'What to fix first, with a sample report', th: 'รู้ว่าควรแก้อะไรก่อน พร้อมรายงานตัวอย่าง' }, src: shot('engineeringscore', 'report.webp') },
      { title: { en: 'No signup to start', th: 'เริ่มได้ไม่ต้องสมัคร' }, detail: { en: 'Paste a URL, get a score', th: 'วาง URL แล้วรับคะแนนได้เลย' }, src: shot('engineeringscore', 'home.webp') },
    ],
  },
  {
    id: 'my-isuzu', label: { en: 'Mobile app', th: 'แอปมือถือ' },
    name: 'my-ISUZU', logo: shot('my-isuzu', 'logo.png'), url: PROJECT_URLS.myIsuzu,
    summary: {
      en: 'Official app for Isuzu owners in Thailand by Tri Petch Isuzu Sales: service booking, vehicle status, coupons and an owner community.',
      th: 'แอปทางการสำหรับเจ้าของรถอีซูซุในไทย โดยตรีเพชรอีซูซุเซลส์ ทั้งจองเข้าศูนย์ เช็กสถานะรถ คูปอง และคอมมูนิตี้ของเจ้าของรถ',
    },
    description: {
      en: 'Owners book service appointments, check their vehicle and warranty status, receive e-quotations for repairs, collect my-MEMBER points and coupons, and share experiences in the my-CIRCLE community.',
      th: 'เจ้าของรถจองนัดเข้าศูนย์บริการ เช็กสถานะรถและการรับประกัน รับใบเสนอราคาซ่อมออนไลน์ สะสมแต้มและคูปอง my-MEMBER และแชร์ประสบการณ์ในคอมมูนิตี้ my-CIRCLE',
    },
    myRole: { en: 'Backend Developer intern (2024), Tri Petch IT Solutions', th: 'นักศึกษาฝึกงาน Backend Developer (2024), Tri Petch IT Solutions' },
    stats: [
      { value: '4.1★', label: 'App Store' },
      { value: '439', label: { en: 'Ratings', th: 'รีวิว' } },
      { value: '2022', label: { en: 'Live since', th: 'เปิดใช้ตั้งแต่' } },
      { value: 'v4.17', label: { en: 'Version', th: 'เวอร์ชัน' } },
    ],
    stack: ['NestJS', 'GraphQL', 'PostgreSQL', 'Redis'],
    gallery: [1, 2, 3, 4, 5].map((index) => shot('my-isuzu', `screen-${index}.webp`)),
    highlights: [
      { title: { en: 'Service booking', th: 'จองเข้าศูนย์บริการ' }, detail: { en: 'Pick car, centre, date and time', th: 'เลือกรถ ศูนย์ วัน และเวลา' }, src: shot('my-isuzu', 'screen-3.webp') },
      { title: 'my-MEMBER', detail: { en: 'Points, tiers and coupons', th: 'แต้ม ระดับสมาชิก และคูปอง' }, src: shot('my-isuzu', 'screen-2.webp') },
      { title: 'my-CIRCLE', detail: { en: 'Isuzu owner community', th: 'คอมมูนิตี้เจ้าของรถอีซูซุ' }, src: shot('my-isuzu', 'screen-4.webp') },
    ],
  },
  {
    id: 'sigmalearn', label: { en: 'EdTech + AI', th: 'EdTech + AI' },
    name: 'Sigma Learn', logo: shot('sigmalearn', 'logo.svg'), url: PROJECT_URLS.sigmalearn,
    summary: {
      en: 'Revision platform for IGCSE, A Level, IB, AP and SAT with an AI tutor that knows the page you are on.',
      th: 'แพลตฟอร์มทบทวนบทเรียน IGCSE, A Level, IB, AP และ SAT พร้อมติวเตอร์ AI ที่รู้ว่าคุณกำลังเรียนหน้าไหนอยู่',
    },
    description: {
      en: 'Syllabus-mapped courses, past-paper questions marked against the real mark scheme, hands-on simulations, and an AI tutor that explains steps and marks written answers.',
      th: 'คอร์สที่ตรงตามหลักสูตร ข้อสอบเก่าที่ตรวจตามเกณฑ์ให้คะแนนจริง แบบจำลองให้ลองทำเอง และติวเตอร์ AI ที่อธิบายทีละขั้นและตรวจคำตอบแบบเขียน',
    },
    myRole: 'Full-Stack Developer, SKY H Group',
    stats: [
      { value: '51', label: { en: 'Courses', th: 'คอร์ส' } },
      { value: '1,760', label: { en: 'Lessons', th: 'บทเรียน' } },
      { value: '5', label: { en: 'Curricula', th: 'หลักสูตร' } },
      { value: 'AI', label: { en: 'Tutor', th: 'ติวเตอร์' } },
    ],
    stack: ['Next.js', 'React', 'FastAPI', 'PostgreSQL'],
    gallery: [shot('sigmalearn', 'home.webp'), shot('sigmalearn', 'past-papers.webp')],
    highlights: [
      { title: { en: 'Past papers, marked', th: 'ข้อสอบเก่า ตรวจให้ด้วย' }, detail: { en: 'Against the real mark scheme', th: 'ตามเกณฑ์ให้คะแนนจริง' }, src: shot('sigmalearn', 'past-papers.webp') },
      { title: { en: 'AI tutor', th: 'ติวเตอร์ AI' }, detail: { en: 'Knows the lesson you are on', th: 'รู้ว่าคุณกำลังเรียนบทไหน' }, src: shot('sigmalearn', 'home.webp') },
    ],
  },
  {
    id: 'pakprik', label: { en: 'E-commerce', th: 'ร้านค้าออนไลน์' },
    name: 'PAK PRIK', logo: shot('pakprik', 'logo.png'), url: PROJECT_URLS.pakprik,
    summary: {
      en: 'Online shop for handcrafted Thai curry pastes, built around a family recipe story.',
      th: 'ร้านออนไลน์ขายพริกแกงไทยทำมือ เล่าผ่านเรื่องราวสูตรประจำครอบครัว',
    },
    description: {
      en: 'Product catalogue, bundle offers, recipes and the brand story behind the curry paste recipes Grandma Somsri perfected over 60 years, with free shipping on larger orders.',
      th: 'แคตตาล็อกสินค้า ชุดสินค้าราคาพิเศษ สูตรอาหาร และเรื่องราวของแบรนด์เบื้องหลังสูตรพริกแกงที่คุณยายสมศรีปรุงมากว่า 60 ปี พร้อมส่งฟรีเมื่อสั่งครบยอด',
    },
    myRole: 'Software Engineer, We Do Dev Work', year: '2026',
    stats: [
      { value: '60+', label: { en: 'Years of recipes', th: 'ปีของสูตร' } },
      { value: '฿1,500', label: { en: 'Free-ship threshold', th: 'ยอดส่งฟรี' } },
      { value: { en: 'Shop', th: 'ร้านค้า' }, label: { en: 'Online store', th: 'ร้านออนไลน์' } },
      { value: { en: 'Live', th: 'ใช้งานจริง' }, label: { en: 'Status', th: 'สถานะ' } },
    ],
    stack: ['SvelteKit', 'Supabase'],
    gallery: [shot('pakprik', 'home.webp'), shot('pakprik', 'product.webp'), shot('pakprik', 'story.webp')],
    highlights: [
      { title: { en: 'Product showcase', th: 'โชว์สินค้า' }, detail: { en: 'Pastes, dishes and bundles', th: 'พริกแกง เมนูอาหาร และชุดสินค้า' }, src: shot('pakprik', 'product.webp') },
      { title: { en: 'Brand story', th: 'เรื่องราวของแบรนด์' }, detail: { en: 'A recipe passed down with love', th: 'สูตรที่ส่งต่อด้วยความรัก' }, src: shot('pakprik', 'story.webp') },
    ],
  },
  {
    id: 'willow-court', label: { en: 'Demo site', th: 'เว็บตัวอย่าง' }, isDemo: true,
    name: 'Willow Court', logo: shot('willow-court', 'logo.png'), url: 'https://tennis-court-rho.vercel.app/',
    summary: {
      en: 'Demo mockup of a private tennis club site: membership tiers, court booking and English/Thai.',
      th: 'เว็บตัวอย่างของคลับเทนนิสส่วนตัว มีแพ็กเกจสมาชิก ระบบจองคอร์ต และรองรับอังกฤษ/ไทย',
    },
    description: {
      en: 'A concept build, not a real club: editorial hero, two membership tiers, a court-booking flow and a full Thai version.',
      th: 'งานคอนเซปต์ ไม่ใช่คลับจริง มีหน้าแรกสไตล์นิตยสาร สมาชิกสองระดับ ขั้นตอนจองคอร์ต และเวอร์ชันภาษาไทยครบทุกหน้า',
    },
    myRole: { en: 'Design & build (demo)', th: 'ออกแบบและพัฒนา (เดโม)' },
    stats: [
      { value: { en: 'Demo', th: 'เดโม' }, label: { en: 'Mockup', th: 'ม็อกอัป' } },
      { value: 'EN/TH', label: { en: 'Languages', th: 'ภาษา' } },
      { value: '2', label: { en: 'Membership tiers', th: 'ระดับสมาชิก' } },
      { value: 'Vercel', label: { en: 'Hosting', th: 'โฮสติ้ง' } },
    ],
    stack: ['SvelteKit', 'Vercel'],
    gallery: [shot('willow-court', 'home.webp'), shot('willow-court', 'thai.webp')],
    highlights: [
      { title: { en: 'Editorial hero', th: 'หน้าแรกสไตล์นิตยสาร' }, detail: { en: 'Full-bleed photo, serif type', th: 'ภาพเต็มจอ ตัวอักษรแบบเซริฟ' }, src: shot('willow-court', 'home.webp') },
      { title: { en: 'Thai version', th: 'เวอร์ชันภาษาไทย' }, detail: { en: 'Every page in EN and TH', th: 'ทุกหน้ามีทั้งอังกฤษและไทย' }, src: shot('willow-court', 'thai.webp') },
    ],
  },
  {
    id: 'portfolio', label: { en: 'This portfolio', th: 'พอร์ตโฟลิโอนี้' },
    name: 'Portfolio site', logo: LOGO_SRC, year: '2026',
    summary: {
      en: 'The site you’re on: a scroll-driven, bilingual landing page built as typed Svelte components.',
      th: 'เว็บที่คุณกำลังดูอยู่ แลนดิ้งเพจสองภาษาที่ขับเคลื่อนด้วยการเลื่อน สร้างจาก Svelte component แบบมี type',
    },
    description: {
      en: 'Started as a single imperative script and refactored into typed Svelte 5 components with rune-based i18n, a Memoji intro and a handwritten signature, prerendered to static HTML.',
      th: 'เริ่มจากสคริปต์ไฟล์เดียว แล้วรีแฟกเตอร์เป็น Svelte 5 component แบบมี type พร้อม i18n ด้วย rune อินโทร Memoji และลายเซ็นเขียนมือ prerender เป็น HTML แบบ static',
    },
    myRole: { en: 'Design & engineering', th: 'ออกแบบและพัฒนา' },
    stats: [
      { value: '2', label: { en: 'Languages', th: 'ภาษา' } },
      { value: '0', label: { en: 'Runtime deps', th: 'dependency ตอนรัน' } },
      { value: 'Static', label: { en: 'Hosting', th: 'โฮสติ้ง' } },
      { value: 'TS', label: { en: 'Typed', th: 'มี type' } },
    ],
    stack: ['SvelteKit', 'TypeScript'],
    gallery: [shot('portfolio', 'home.webp')],
    highlights: [
      { title: { en: 'Scroll-driven showcase', th: 'โชว์เคสที่เลื่อนตามการสกรอลล์' }, detail: { en: 'Pinned section steps through projects', th: 'ส่วนที่ปักหมุดไว้ไล่ดูทีละโปรเจกต์' }, src: shot('portfolio', 'home.webp') },
    ],
  },
];

/** Looks up a project by id; throws so a typo fails the prerender instead of rendering nothing. */
const projectById = (id: string): Project => {
  const project = projects.find((candidate) => candidate.id === id);
  if (!project) throw new Error(`Unknown project id "${id}"`);
  return project;
};

/** The live app featured in the "tested in production" row. */
export const productionProject = projectById('my-isuzu');

type ShotLayout = Omit<HeroImageShot, 'src' | 'logo' | 'title'>;

/** A hero card showing a project screenshot; title and logo come from the project itself. */
const projectShot = (projectId: string, file: string, layout: ShotLayout): HeroImageShot => {
  const project = projectById(projectId);
  return { ...layout, src: shot(projectId, file), logo: project.logo, title: project.name };
};

// Image cards are screenshots of the projects above; `art` cards are drawn in HTML (DevArt.svelte).
export const heroShots: HeroShot[] = [
  projectShot('engineeringscore', 'home.webp', { side: 'left', offsetX: -1, offsetY: 9, width: 180, height: 190, rotation: -5, depth: 0.6, caption: 'SvelteKit · SaaS' }),
  { side: 'left', offsetX: 8, offsetY: -5, width: 150, height: 120, rotation: 3, depth: 0.3, art: 'terminal', tech: 'Svelte', title: 'build.log', caption: 'Svelte · build', isDesktopOnly: true },
  projectShot('my-isuzu', 'screen-3.webp', { side: 'left', offsetX: 14, offsetY: 27, width: 150, height: 180, rotation: 2, depth: 0.9, caption: { en: 'Mobile app', th: 'แอปมือถือ' }, isDesktopOnly: true }),
  { side: 'left', offsetX: -1.5, offsetY: 45, width: 200, height: 160, rotation: -3, depth: 0.5, art: 'code', tech: 'NestJS', title: 'orders.controller.ts', caption: 'NestJS', isDesktopOnly: true },
  projectShot('pakprik', 'product.webp', { side: 'left', offsetX: 4, offsetY: 68, width: 190, height: 230, rotation: 3, depth: 1, caption: { en: 'E-commerce', th: 'ร้านค้าออนไลน์' } }),
  projectShot('willow-court', 'home.webp', { side: 'right', offsetX: 12, offsetY: -7, width: 150, height: 110, rotation: -3, depth: 0.4, caption: { en: 'Demo site', th: 'เว็บตัวอย่าง' }, isDesktopOnly: true }),
  projectShot('sigmalearn', 'past-papers.webp', { side: 'right', offsetX: 0, offsetY: 5, width: 160, height: 180, rotation: 4, depth: 0.7, caption: 'Next.js · EdTech' }),
  { side: 'right', offsetX: -1, offsetY: 34, width: 200, height: 230, rotation: -2, depth: 0.9, art: 'schema', tech: 'PostgreSQL', title: 'schema.sql', caption: 'PostgreSQL', isDesktopOnly: true },
  { side: 'right', offsetX: 13, offsetY: 76, width: 150, height: 190, rotation: -2, depth: 0.5, art: 'api', tech: 'TypeScript', title: 'GET /orders/1042', caption: 'TypeScript API', isDesktopOnly: true },
  projectShot('portfolio', 'home.webp', { side: 'right', offsetX: -1, offsetY: 71, width: 180, height: 140, rotation: 3, depth: 0.8, caption: 'SvelteKit · 2026' }),
];

/** Hero tech stack, in display order. */
export const heroTech: TechKey[] = ['TypeScript', 'NestJS', 'Svelte', 'PostgreSQL'];

/** Work history, in the owner's CV order. */
export const experience: Job[] = [
  {
    company: 'We Do Dev Work', role: 'Software Engineer', employment: 'fullTime', location: { en: 'Hybrid', th: 'ไฮบริด' }, period: { start: '2026-06', end: '2026-10' },
    summary: {
      en: 'Shipped client products to production: the PAK PRIK shop and the EngineeringScore audit SaaS.',
      th: 'ส่งมอบโปรดักต์ของลูกค้าขึ้นระบบจริง ทั้งร้านออนไลน์ PAK PRIK และ SaaS ตรวจเว็บไซต์ EngineeringScore',
    },
    highlights: [],
    stack: ['SvelteKit', 'Supabase', 'Stripe', 'Tailwind CSS', 'AWS'],
    links: [{ label: 'pakprik.com', url: PROJECT_URLS.pakprik }, { label: 'engineeringscore.com', url: PROJECT_URLS.engineeringscore }],
    color: '#b5efc4',
  },
  {
    company: 'SKY H Group', role: 'Full-Stack Developer', employment: 'projectBased', location: { en: 'Remote', th: 'รีโมต' }, period: { start: '2025-12' },
    summary: {
      en: 'FastAPI + PostgreSQL APIs for courses, modules and topics, a Next.js admin portal and a JSONB system for interactive content types.',
      th: 'API ด้วย FastAPI + PostgreSQL สำหรับคอร์ส โมดูล และหัวข้อ ระบบหลังบ้านด้วย Next.js และระบบ JSONB สำหรับคอนเทนต์แบบอินเทอร์แอกทีฟ',
    },
    highlights: [
      {
        en: 'Architected and developed scalable RESTful APIs using FastAPI and PostgreSQL for course, module, and topic management systems.',
        th: 'ออกแบบและพัฒนา RESTful API ที่ขยายได้ด้วย FastAPI และ PostgreSQL สำหรับระบบจัดการคอร์ส โมดูล และหัวข้อ',
      },
      {
        en: 'Designed and implemented an admin portal using Next.js, improving long-term maintainability and extensibility.',
        th: 'ออกแบบและพัฒนาระบบหลังบ้านด้วย Next.js ให้ดูแลและต่อยอดได้ง่ายในระยะยาว',
      },
      {
        en: 'Built a standardized API response and error handling system, improving frontend-backend integration consistency, and integrated Redis for caching and performance.',
        th: 'สร้างมาตรฐาน API response และการจัดการ error ให้หน้าบ้านกับหลังบ้านเชื่อมกันได้สม่ำเสมอ และใช้ Redis ทำแคชเพื่อเพิ่มประสิทธิภาพ',
      },
      {
        en: 'Developed a dynamic content management system using PostgreSQL JSONB and Pydantic models to support multiple interactive content types.',
        th: 'พัฒนาระบบจัดการคอนเทนต์แบบไดนามิกด้วย PostgreSQL JSONB และ Pydantic model รองรับคอนเทนต์อินเทอร์แอกทีฟหลายรูปแบบ',
      },
      {
        en: 'Containerized backend services with Docker and automated local environment setup, reducing onboarding time from hours to minutes.',
        th: 'นำบริการหลังบ้านขึ้น Docker และตั้งค่าเครื่อง dev อัตโนมัติ ลดเวลาเริ่มงานของคนใหม่จากหลายชั่วโมงเหลือไม่กี่นาที',
      },
    ],
    stack: ['FastAPI', 'PostgreSQL', 'Redis', 'Next.js', 'TypeScript', 'Docker', 'SQLAlchemy', 'Pydantic'],
    links: [{ label: 'sigmalearn.io', url: PROJECT_URLS.sigmalearn }],
    color: '#d4c2fb',
  },
  {
    company: 'SKloha Business Website', role: 'Full-Stack Developer', employment: 'freelance', location: { en: 'Remote', th: 'รีโมต' }, period: { start: '2026-01', end: '2026-02' },
    summary: {
      en: 'A fast, SEO-friendly business site on a Strapi CMS, with automatic image watermarking.',
      th: 'เว็บไซต์ธุรกิจที่เร็วและติด SEO บน Strapi CMS พร้อมใส่ลายน้ำรูปภาพอัตโนมัติ',
    },
    highlights: [
      {
        en: 'Developed a responsive business website using Next.js and Tailwind CSS with a focus on performance and SEO.',
        th: 'พัฒนาเว็บไซต์ธุรกิจแบบ responsive ด้วย Next.js และ Tailwind CSS โดยเน้นประสิทธิภาพและ SEO',
      },
      {
        en: 'Integrated Strapi v5 as a headless CMS for product and category management workflows.',
        th: 'เชื่อม Strapi v5 เป็น headless CMS สำหรับจัดการสินค้าและหมวดหมู่',
      },
      {
        en: 'Implemented hybrid SSR and client-side rendering strategies to improve loading performance and user experience.',
        th: 'ผสาน SSR กับการเรนเดอร์ฝั่ง client เพื่อให้โหลดเร็วขึ้นและใช้งานลื่นขึ้น',
      },
      {
        en: 'Customized file upload pipelines with Sharp-based watermarking automation to strengthen brand consistency.',
        th: 'ปรับขั้นตอนอัปโหลดไฟล์ให้ใส่ลายน้ำอัตโนมัติด้วย Sharp เพื่อให้แบรนด์ดูเป็นหนึ่งเดียว',
      },
    ],
    stack: ['Node.js', 'Next.js', 'React', 'Strapi', 'Tailwind CSS', 'Sharp'],
    links: [{ label: 'sk-stainless.com', url: 'https://sk-stainless.com' }],
    color: '#ffb3a7',
  },
  {
    company: 'Tri Petch IT Solutions Co., Ltd.', role: 'Backend Developer', employment: 'internship', location: { en: 'Bangkok', th: 'กรุงเทพฯ' }, period: { start: '2024-06', end: '2024-10' },
    summary: {
      en: 'NestJS + GraphQL backend services for the my-ISUZU app, plus production support.',
      th: 'บริการหลังบ้านด้วย NestJS + GraphQL สำหรับแอป my-ISUZU และดูแลระบบที่ใช้งานจริง',
    },
    highlights: [
      {
        en: 'Developed and maintained backend services for the my-ISUZU application and internal platforms using NestJS.',
        th: 'พัฒนาและดูแลบริการหลังบ้านของแอป my-ISUZU และแพลตฟอร์มภายในด้วย NestJS',
      },
      {
        en: 'Implemented and maintained GraphQL APIs for authentication, user management, and business workflows.',
        th: 'พัฒนาและดูแล GraphQL API สำหรับการยืนยันตัวตน การจัดการผู้ใช้ และขั้นตอนทางธุรกิจ',
      },
      {
        en: 'Monitored production systems, investigated runtime failures, and resolved backend issues to improve service reliability.',
        th: 'เฝ้าระบบที่ใช้งานจริง ไล่หาสาเหตุเมื่อระบบล่ม และแก้ปัญหาหลังบ้านให้บริการเสถียรขึ้น',
      },
      {
        en: 'Collaborated with cross-functional teams to debug distributed system issues and deliver production fixes under tight timelines.',
        th: 'ทำงานร่วมกับทีมต่าง ๆ เพื่อดีบักปัญหาระบบแบบกระจาย และส่งการแก้ไขขึ้นระบบจริงภายใต้เวลาที่จำกัด',
      },
      {
        en: 'Participated in code reviews and engineering best practices, contributing to cleaner and more maintainable codebases.',
        th: 'ร่วมรีวิวโค้ดและวางแนวปฏิบัติที่ดี ช่วยให้โค้ดสะอาดและดูแลง่ายขึ้น',
      },
    ],
    stack: ['Node.js', 'NestJS', 'GraphQL', 'React', 'PostgreSQL', 'Redis', 'Datadog', 'AWS'],
    links: [{ label: { en: 'my-ISUZU on the App Store', th: 'my-ISUZU บน App Store' }, url: PROJECT_URLS.myIsuzu }],
    color: '#fde09a',
  },
  {
    company: 'Media Intelligence Group', role: 'Full-Stack Developer', employment: 'freelance', location: { en: 'Remote', th: 'รีโมต' }, period: { start: '2023-11', end: '2023-12' },
    summary: {
      en: 'A brand-assessment web app with a dynamic questionnaire, shipped on Vercel.',
      th: 'เว็บแอปประเมินแบรนด์พร้อมแบบสอบถามแบบไดนามิก ขึ้นระบบบน Vercel',
    },
    highlights: [
      {
        en: 'Developed a brand intelligence web application using Next.js and TypeScript, enabling users to evaluate brand performance through structured assessment flows.',
        th: 'พัฒนาเว็บแอปวิเคราะห์แบรนด์ด้วย Next.js และ TypeScript ให้ผู้ใช้ประเมินผลของแบรนด์ผ่านขั้นตอนที่เป็นระบบ',
      },
      {
        en: 'Designed a dynamic questionnaire system supporting multiple product types (high vs low involvement), improving flexibility of business logic.',
        th: 'ออกแบบระบบแบบสอบถามแบบไดนามิกที่รองรับสินค้าหลายประเภท (high vs low involvement) ให้ปรับ business logic ได้ยืดหยุ่นขึ้น',
      },
      {
        en: 'Built and deployed a production-ready application on Vercel with optimized routing and client-side rendering.',
        th: 'สร้างและ deploy แอปพร้อมใช้งานจริงบน Vercel พร้อมปรับ routing และการเรนเดอร์ฝั่ง client ให้เหมาะสม',
      },
      {
        en: 'Collaborated with digital-marketing stakeholders to translate brand strategy concepts into functional product features.',
        th: 'ทำงานร่วมกับทีมดิจิทัลมาร์เก็ตติ้ง แปลงแนวคิดกลยุทธ์แบรนด์ให้เป็นฟีเจอร์ที่ใช้งานได้จริง',
      },
    ],
    stack: ['Node.js', 'Next.js', 'TypeScript', 'Vercel'],
    links: [{ label: { en: 'Demo', th: 'เดโม' }, url: 'https://migroup-brandtest.vercel.app/' }],
    color: '#b4f0ec',
  },
  {
    company: 'Thai Airways Employees’ Saving & Credit Cooperative', role: 'Software Developer', employment: 'internship', location: { en: 'Remote', th: 'รีโมต' }, period: { start: '2023-06', end: '2023-08' },
    summary: {
      en: 'A device-ownership tracking system for the organisation’s IT team.',
      th: 'ระบบติดตามการถือครองอุปกรณ์สำหรับทีมไอทีขององค์กร',
    },
    highlights: [
      {
        en: 'Developed a device management system using Next.js and TypeScript to help the IT team track device ownership across the organization.',
        th: 'พัฒนาระบบจัดการอุปกรณ์ด้วย Next.js และ TypeScript ช่วยทีมไอทีติดตามว่าใครถืออุปกรณ์ชิ้นไหนทั่วทั้งองค์กร',
      },
      {
        en: 'Built dynamic, responsive interfaces aligned with the organization’s brand colors and design guidelines.',
        th: 'สร้างหน้าจอแบบ responsive ที่ตรงกับสีแบรนด์และแนวทางการออกแบบขององค์กร',
      },
      {
        en: 'Implemented backend functionality with Node.js and integrated data storage using MySQL via XAMPP.',
        th: 'พัฒนาฝั่งหลังบ้านด้วย Node.js และเก็บข้อมูลด้วย MySQL ผ่าน XAMPP',
      },
    ],
    stack: ['Node.js', 'Next.js', 'TypeScript', 'MySQL', 'XAMPP'],
    links: [],
    color: '#ffd1e3',
  },
];

/** Every tool I've shipped with, from the CV; each shows as a logo card. */
export const skills: TechKey[] = [
  'Python', 'TypeScript', 'Java', 'FastAPI', 'NestJS', 'Express.js', 'GraphQL', 'JWT', 'Redis',
  'Next.js', 'React', 'Svelte', 'Tailwind CSS',
  'PostgreSQL', 'MySQL', 'Prisma', 'SQLAlchemy', 'TypeORM',
  'Docker', 'Linux', 'Git', 'GitHub Actions', 'GitLab CI/CD', 'Supabase', 'Cloudflare', 'AWS',
  'Llama', 'MLflow',
];

export const socials: Social[] = [
  { label: 'GitHub', handle: '@redbiiddsun', url: 'https://github.com/redbiiddsun', isExternal: true, icon: techIcons.GitHub },
  { label: 'LinkedIn', handle: 'in/phanasorn-srisayam', url: 'https://www.linkedin.com/in/phanasorn-srisayam', isExternal: true, icon: techIcons.LinkedIn },
  { label: { en: 'Email', th: 'อีเมล' }, handle: OWNER.email, url: MAILTO_HREF, isExternal: false, icon: MAIL_ICON },
];

/** Keep section: one person owns every layer of the stack. */
export const stackLayers: StackLayer[] = [
  { label: 'UI', techs: ['Next.js', 'Svelte'] },
  { label: 'API', techs: ['FastAPI', 'NestJS'] },
  { label: { en: 'Data', th: 'ข้อมูล' }, techs: ['PostgreSQL', 'Redis'] },
  { label: { en: 'Ship', th: 'ส่งขึ้นระบบ' }, techs: ['Docker', 'AWS'] },
];

/** Keep section: how a production incident is handled, last step shown as resolved. */
export const incidentSteps: LocalText[] = [
  { en: 'Alert', th: 'แจ้งเตือน' },
  { en: 'Trace', th: 'ไล่หาสาเหตุ' },
  { en: 'Fix', th: 'แก้ไข' },
  'Deploy',
];

/** Keep section: services in the mock `docker compose up` output (terminal text, not translated). */
export const setupServices = ['postgres', 'redis', 'api'];

/** Features section: queries the search box types through. */
export const searchQueries: LocalText[] = [
  { en: 'realtime dashboard', th: 'แดชบอร์ดเรียลไทม์' },
  { en: 'stripe checkout', th: 'ชำระเงินด้วย Stripe' },
  { en: 'AI chatbot', th: 'แชตบอท AI' },
  'REST API',
  { en: 'booking app', th: 'แอปจองคิว' },
];
