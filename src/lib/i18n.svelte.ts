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
    "keep.a": "Agencies put layers between you and the code.",
    "keep.b": "With me, you talk to the builder.",
    "k1.a": "Work with me directly,",
    "k1.b": "one to one.",
    "k1.p": "You talk to the developer who writes the code. No account managers, no handoffs, no lost context, so decisions take hours, not weeks.",
    "k1.link": "See what I’ve built",
    "k2.a": "A clear process,",
    "k2.b": "a live demo every week.",
    "k2.p": "We agree on scope and milestones up front. You get a working demo every week, so you always know where things stand.",
    "feat.title": "One developer. The whole stack.",
    "f1.a": "Build",
    "f1.b": "with Stack of your choice",
    "f2.a": "Every feature,",
    "f2.b": "fast & findable",
    "f3.a": "Find me",
    "f3.b": "around the web",
    "social.newTab": "opens in a new tab",
    "final.title": "Have a project in mind?",
    "final.sub": "Tell me about it. I reply within a day.",
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
        "keep.a": "เอเจนซีมีคนคั่นกลางระหว่างคุณกับโค้ดหลายชั้น",
        "keep.b": "ที่นี่ คุณคุยกับคนเขียนโค้ดโดยตรง",
        "k1.a": "ทำงานด้วยกันตรง ๆ",
        "k1.b": "แบบตัวต่อตัว",
        "k1.p": "คุณคุยกับนักพัฒนาที่เขียนโค้ดเอง ไม่มีคนกลาง ไม่มีการส่งต่องาน ไม่มีข้อมูลตกหล่น ตัดสินใจได้ในไม่กี่ชั่วโมง ไม่ใช่หลายสัปดาห์",
        "k1.link": "ดูผลงาน",
        "k2.a": "ขั้นตอนชัดเจน",
        "k2.b": "มีเดโมให้ดูทุกสัปดาห์",
        "k2.p": "ตกลงขอบเขตงานและเป้าหมายกันตั้งแต่ต้น แล้วคุณจะได้เห็นเดโมที่ใช้งานได้จริงทุกสัปดาห์ รู้ความคืบหน้าตลอดเวลา",
        "feat.title": "นักพัฒนาคนเดียว ครบทั้งสแตก",
        "f1.a": "สร้าง",
        "f1.b": "โปรดักต์ที่ลูกค้ารัก",
        "f2.a": "ทุกฟีเจอร์",
        "f2.b": "เร็วและค้นเจอง่าย",
        "f3.a": "ติดตามผม",
        "f3.b": "ได้ทุกช่องทาง",
        "social.newTab": "เปิดในแท็บใหม่",
        "final.title": "มีโปรเจกต์ในใจไหม?",
        "final.sub": "เล่ามาได้เลย ตอบกลับภายในหนึ่งวัน",
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
