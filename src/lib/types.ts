export type Lang = 'en' | 'th';

/** A screenshot in the hero collage. */
export interface HeroShot {
  side: 'left' | 'right';
  /** Horizontal offset from `side`, in % of the hero width. */
  offsetX: number;
  /** Vertical offset from the top, in % of the hero height. */
  offsetY: number;
  width: number;
  height: number;
  rotation: number;
  /** Parallax strength, 0–1. */
  depth: number;
  seed: string;
  isMidLayer?: boolean;
  title: string;
  caption: string;
}

export interface CaseStudy {
  seed: string;
  title: string;
  excerpt: string;
  readMinutes: number;
}

export interface GalleryTile {
  seed?: string;
  height?: number;
  /** Small badge on the tile, e.g. "Live". */
  badge?: string;
  caseStudy?: CaseStudy;
}

export interface Highlight {
  title: string;
  detail: string;
  seed: string;
}

export interface ProjectStat {
  value: string;
  label: string;
}

export type Banner =
  /** Repeated typographic banner: `text` then bold `emphasis`. */
  | { type: 'type'; text: string; emphasis: string }
  | { type: 'gradient'; label: string }
  | { type: 'image'; seed: string };

export interface Project {
  id: string;
  /** Short label for the showcase list. */
  label: string;
  name: string;
  logoSeed: string;
  url?: string;
  year: string;
  summary: string;
  description: string;
  myRole: string;
  stats: ProjectStat[];
  banner: Banner;
  stack: string[];
  gallery: GalleryTile[];
  highlights: Highlight[];
}

export interface Testimonial {
  name: string;
  avatarId: number;
  text: string;
  title: string;
}

export interface StickyNote {
  color: string;
  leftPercent: number;
  topPx: number;
  rotation: number;
  text: Record<Lang, string>;
}

export type ProjectTab = 'gallery' | 'highlights' | 'feedback' | 'details';
