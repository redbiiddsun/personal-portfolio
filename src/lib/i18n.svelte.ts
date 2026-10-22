import type { Lang } from './types';
import { storage } from './utils';

const LANG_STORAGE_KEY = 'lang';

// Values are plain text, except `people.sub` which is trusted markup (rendered with {@html}).
const english = {
  cta: 'Get started',
  'hero.l1': 'Show the world',
  'hero.l2a': 'what',
  'hero.l2b': 'can do',
  'hero.sub': 'In the age of AI, your portfolio proves why clients need you.',
  'cd.d': 'days', 'cd.h': 'hours', 'cd.m': 'mins', 'cd.s': 'seconds',
  scroll: 'Scroll down',
  'people.a': 'People still need pe',
  'people.b': 'ople',
  'people.sub': 'Clients don’t just buy outputs. They buy expertise, experience, taste, and trust.<br>That’s why your portfolio matters more than ever.',
  'notes.title': 'Freelancing is hard enough...',
  'notes.sub': 'Let us handle the problem for you',
  'notes.hint': 'Psst, you can drag them around.',
  'keep.a': 'Other platforms keep taking a cut.',
  'keep.b': 'We let you keep more.',
  'k1.a': 'Bring your own clients,',
  'k1.b': 'you keep 100%!',
  'k1.p': 'Invite them through your profile link and use us to get the job done. 0% referral fee, forever! (aka 0% commission). Payment fee may apply.',
  'k1.link': 'Why bring clients to craftly?',
  'k2.a': 'A client from us?',
  'k2.b': 'A small referral fee, then 0%.',
  'k2.p': 'When a client discovers you through craftly, we take a small referral fee on the first order only. Every repeat order from that client? 0%.',
  'feat.title': 'One platform. Everything you need.',
  'f1.a': 'Document', 'f1.b': 'your portfolio and reviews',
  'f2.a': 'Get discovered.', 'f2.b': 'Earn more',
  'f3.a': 'Secure', 'f3.b': 'payment worldwide',
  'f4.a': 'Keep every order', 'f4.b': 'Organized',
  'final.title': 'Your next client is already looking.',
  'final.sub': 'Build your profile in minutes. It’s free.',
  'consent.title': 'We’ve updated our terms',
  'consent.body': 'By continuing, you agree to our updated Terms of Service and Privacy Policy.',
  'consent.btn': 'Accept and continue',
  'footer.privacy': 'Privacy Policy',
  'footer.terms': 'Terms of Service',
};

export type DictKey = keyof typeof english;

const dict: Record<Lang, Record<DictKey, string>> = {
  en: english,
  th: {
    cta: 'เริ่มต้นใช้งาน',
    'hero.l1': 'ให้โลกได้เห็น',
    'hero.l2a': 'ว่า',
    'hero.l2b': 'ทำอะไรได้',
    'hero.sub': 'ในยุค AI พอร์ตโฟลิโอคือหลักฐานว่าทำไมลูกค้าต้องการคุณ',
    'cd.d': 'วัน', 'cd.h': 'ชั่วโมง', 'cd.m': 'นาที', 'cd.s': 'วินาที',
    scroll: 'เลื่อนลง',
    'people.a': 'คนยังต้องการ',
    'people.b': 'คน',
    'people.sub': 'ลูกค้าไม่ได้ซื้อแค่ผลงาน แต่ซื้อความเชี่ยวชาญ ประสบการณ์ รสนิยม และความไว้ใจ<br>นั่นคือเหตุผลที่พอร์ตโฟลิโอของคุณสำคัญกว่าที่เคย',
    'notes.title': 'งานฟรีแลนซ์ก็ยากพออยู่แล้ว...',
    'notes.sub': 'ปัญหาพวกนี้ ให้เราจัดการแทน',
    'notes.hint': 'ลองลากโน้ตเล่นดูสิ',
    'keep.a': 'แพลตฟอร์มอื่นหักค่าคอมไม่หยุด',
    'keep.b': 'เราให้คุณเก็บได้มากกว่า',
    'k1.a': 'พาลูกค้ามาเอง',
    'k1.b': 'รับเต็ม 100%!',
    'k1.p': 'ชวนลูกค้าผ่านลิงก์โปรไฟล์ของคุณ แล้วใช้เราช่วยปิดงานให้จบ ค่าแนะนำ 0% ตลอดไป (คอมมิชชัน 0%) อาจมีค่าธรรมเนียมการชำระเงิน',
    'k1.link': 'ทำไมต้องพาลูกค้ามาที่ craftly?',
    'k2.a': 'ลูกค้ามาจากเรา?',
    'k2.b': 'ค่าแนะนำเล็กน้อย จากนั้น 0%',
    'k2.p': 'เมื่อลูกค้าเจอคุณผ่าน craftly เราคิดค่าแนะนำเฉพาะออเดอร์แรก ออเดอร์ต่อ ๆ ไปจากลูกค้าคนเดิม 0%',
    'feat.title': 'แพลตฟอร์มเดียว ครบทุกอย่างที่ต้องใช้',
    'f1.a': 'รวบรวม', 'f1.b': 'ผลงานและรีวิวของคุณ',
    'f2.a': 'ให้ลูกค้าเจอคุณ', 'f2.b': 'รายได้เพิ่มขึ้น',
    'f3.a': 'ปลอดภัย', 'f3.b': 'ทุกการชำระเงินทั่วโลก',
    'f4.a': 'ทุกออเดอร์', 'f4.b': 'เป็นระเบียบ',
    'final.title': 'ลูกค้าคนต่อไปกำลังมองหาคุณอยู่',
    'final.sub': 'สร้างโปรไฟล์ได้ในไม่กี่นาที ฟรี',
    'consent.title': 'เราได้อัปเดตข้อกำหนด',
    'consent.body': 'การใช้งานต่อถือว่าคุณยอมรับข้อกำหนดการใช้งานและนโยบายความเป็นส่วนตัวฉบับใหม่',
    'consent.btn': 'ยอมรับและดำเนินการต่อ',
    'footer.privacy': 'นโยบายความเป็นส่วนตัว',
    'footer.terms': 'ข้อกำหนดการใช้งาน',
  },
};

export const locale = $state<{ lang: Lang }>({ lang: 'en' });

export const t = (key: DictKey) => dict[locale.lang][key];

export const setLang = (lang: Lang) => {
  locale.lang = lang;
  document.documentElement.lang = lang;
  storage.set(LANG_STORAGE_KEY, lang);
};

/** Apply the saved language. Call on mount, so prerendered HTML stays English. */
export const restoreLang = () => {
  if (storage.get(LANG_STORAGE_KEY) === 'th') setLang('th');
};
