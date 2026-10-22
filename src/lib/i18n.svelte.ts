import type { Lang } from "./types";
import { storage } from "./utils";

const LANG_STORAGE_KEY = "lang";

// Values are plain text, except `people.sub` which is trusted markup (rendered with {@html}).
const english = {
    cta: "Email me",
    "hero.l1": "Hi, I’m Sun.",
    "hero.l2a": "I build",
    "hero.l2b": "that ship.",
    "hero.sub": "Full-stack developer, from database to pixel.",
    scroll: "Scroll down",
    "people.a": "Good software needs pe",
    "people.b": "ople",
    "people.sub":
        "AI can write code. Shipping a product people love still takes judgment, care and ownership.<br>That’s what I bring to every project.",
    "experience.title": "Where I’ve worked",
    "experience.sub": "From internships to production systems.",
    "experience.details": "Details",
    "experience.hide": "Hide details",
    "experience.hint": "Psst, open a note for the full story.",
    "keep.a": "I don’t just write code.",
    "keep.b": "I ship software that runs.",
    "k1.a": "The whole stack,",
    "k1.b": "built end to end.",
    "k1.p": "I design the schema, write the API, build the UI and ship it in containers. One person owns every layer, so nothing gets lost between them.",
    "k1.link": "See what I’ve built",
    "k2.a": "Tested in production,",
    "k2.b": "on apps people use.",
    "k2.p": "At Tri Petch I worked on the my-ISUZU backend: NestJS and GraphQL APIs, monitoring with Datadog, and fixing live issues under tight deadlines.",
    "k3.a": "Faster teams,",
    "k3.b": "not just faster code.",
    "k3.p": "On Sigma Learn I containerised the backend and automated local setup, cutting onboarding from hours to minutes, and standardised API responses so frontend and backend speak the same language.",
    "k3.from": "hours",
    "k3.to": "minutes",
    "feat.title": "One developer. The whole stack.",
    "f1.a": "Build",
    "f1.b": "with Stack of your choice",
    "f2.a": "Every feature,",
    "f2.b": "fast & findable",
    "f3.a": "Find me",
    "f3.b": "around the web",
    "social.newTab": "opens in a new tab",
    "final.title": "Have a project",
    "final.titleMark": "in mind?",
    "final.sub": "Tell me about it. I reply within a day.",
    "final.note": "say hi!",
    "final.or": "or copy",
    "final.copied": "Copied",
};

export type DictKey = keyof typeof english;

const dict: Record<Lang, Record<DictKey, string>> = {
    en: english,
    th: {
        cta: "ส่งอีเมล",
        "hero.l1": "สวัสดี นี่คือ Sun",
        "hero.l2a": "สร้าง",
        "hero.l2b": "ที่ใช้งานได้จริง",
        "hero.sub": "นักพัฒนา Full-stack ตั้งแต่ฐานข้อมูลจนถึงหน้าจอ",
        scroll: "เลื่อนลง",
        "people.a": "ซอฟต์แวร์ดี ๆ ต้องมี",
        "people.b": "คนทำ",
        "people.sub":
            "AI เขียนโค้ดได้ แต่การส่งมอบโปรดักต์ที่คนใช้แล้วรัก ยังต้องอาศัยวิจารณญาณ ความใส่ใจ และความรับผิดชอบ<br>นั่นคือสิ่งที่ Sun ใส่ลงไปในทุกโปรเจกต์",
        "experience.title": "ประสบการณ์ทำงาน",
        "experience.sub": "จากฝึกงาน สู่ระบบที่ใช้งานจริง",
        "experience.details": "รายละเอียด",
        "experience.hide": "ซ่อนรายละเอียด",
        "experience.hint": "เปิดโน้ตเพื่อดูรายละเอียดทั้งหมด",
        "keep.a": "ไม่ได้แค่เขียนโค้ด",
        "keep.b": "แต่ส่งงานที่ใช้งานได้จริง",
        "k1.a": "ครบทั้งสแตก",
        "k1.b": "ทำเองตั้งแต่ต้นจนจบ",
        "k1.p": "ออกแบบฐานข้อมูล เขียน API ทำหน้าเว็บ และ deploy ด้วย container เองทั้งหมด คนเดียวดูแลทุกชั้น ไม่มีอะไรตกหล่นระหว่างทาง",
        "k1.link": "ดูผลงาน",
        "k2.a": "ผ่านงานบนระบบจริง",
        "k2.b": "บนแอปที่มีคนใช้จริง",
        "k2.p": "ที่ Tri Petch ดูแลระบบหลังบ้านของแอป my-ISUZU ทั้ง API ด้วย NestJS และ GraphQL เฝ้าระบบด้วย Datadog และแก้ปัญหาบนระบบจริงภายใต้เวลาที่จำกัด",
        "k3.a": "ทีมทำงานเร็วขึ้น",
        "k3.b": "ไม่ใช่แค่โค้ดเร็วขึ้น",
        "k3.p": "ที่ Sigma Learn จัดระบบหลังบ้านให้รันบน Docker และตั้งค่าเครื่อง dev อัตโนมัติ ลดเวลาเริ่มงานของคนใหม่จากหลายชั่วโมงเหลือไม่กี่นาที และวางมาตรฐาน API response ให้หน้าบ้านกับหลังบ้านทำงานเข้ากันได้",
        "k3.from": "หลายชั่วโมง",
        "k3.to": "ไม่กี่นาที",
        "feat.title": "นักพัฒนาคนเดียว ครบทั้งสแตก",
        "f1.a": "สร้าง",
        "f1.b": "โปรดักต์ที่ลูกค้ารัก",
        "f2.a": "ทุกฟีเจอร์",
        "f2.b": "เร็วและค้นเจอง่าย",
        "f3.a": "ติดตามผม",
        "f3.b": "ได้ทุกช่องทาง",
        "social.newTab": "เปิดในแท็บใหม่",
        "final.title": "มีโปรเจกต์",
        "final.titleMark": "ในใจไหม?",
        "final.sub": "เล่ามาได้เลย ตอบกลับภายในหนึ่งวัน",
        "final.note": "ทักมาได้เลย!",
        "final.or": "หรือคัดลอก",
        "final.copied": "คัดลอกแล้ว",
    },
};

export const locale = $state<{ lang: Lang }>({ lang: "en" });

export const t = (key: DictKey) => dict[locale.lang][key];

export const setLang = (lang: Lang) => {
    locale.lang = lang;
    document.documentElement.lang = lang;
    storage.set(LANG_STORAGE_KEY, lang);
};

/** Apply the saved language. Call on mount, so prerendered HTML stays English. */
export const restoreLang = () => {
    if (storage.get(LANG_STORAGE_KEY) === "th") setLang("th");
};
