import type { techIcons } from './tech-icons';

export type Lang = 'en' | 'th';

export type DevArtKind = 'code' | 'terminal' | 'schema' | 'api';

/** A card in the hero collage: a project screenshot, or an HTML-drawn dev artefact. */
interface HeroShotBase {
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
  isMidLayer?: boolean;
  title: string;
  caption: string;
}

/** `src`/`logo` are paths under /static (screenshots of the project, and its icon). */
export type HeroImageShot = HeroShotBase & { src: string; logo: string };
/** Hero tech logos; `Extract` keeps the union tied to the `techIcons` keys. */
export type TechName = Extract<keyof typeof techIcons, 'TypeScript' | 'NestJS' | 'Svelte' | 'PostgreSQL'>;
/** `tech` names a `techStack` entry whose logo is shown as the card's icon. */
export type HeroDevShot = HeroShotBase & { art: DevArtKind; tech: TechName };
export type HeroShot = HeroImageShot | HeroDevShot;

export interface TechIcon {
  /** Brand colour for the logo. */
  color: string;
  /** Single SVG path in a 24×24 viewBox. */
  path: string;
  /** Tile background for light brand marks that lack contrast on the default white tile. */
  tile?: string;
}

export type TechLogo = TechIcon & { name: TechName };

export interface GalleryTile {
  src: string;
  /** Rendered tile height in px (masonry). */
  height: number;
  /** Small badge on the tile, e.g. "Live". */
  badge?: string;
}

export interface Highlight {
  title: string;
  detail: string;
  src: string;
}

export interface ProjectStat {
  value: string;
  label: string;
}

export type Banner =
  /** Repeated typographic banner: `text` then bold `emphasis`. */
  | { type: 'type'; text: string; emphasis: string }
  | { type: 'gradient'; label: string }
  | { type: 'image'; src: string };

export interface Project {
  id: string;
  /** Short label for the showcase list. */
  label: string;
  name: string;
  logo: string;
  url?: string;
  /** Concept or mockup work, not a shipped client product. */
  isDemo?: boolean;
  year?: string;
  summary: string;
  description: string;
  myRole: string;
  stats: ProjectStat[];
  banner: Banner;
  stack: string[];
  gallery: GalleryTile[];
  highlights: Highlight[];
}

export interface JobLink {
  label: string;
  url: string;
}

export interface Job {
  company: string;
  role: string;
  employment: 'Full-time' | 'Freelance' | 'Internship' | 'Project-based';
  /** Work arrangement or city, e.g. "Remote", "Hybrid", "Bangkok". */
  location: string;
  period: string;
  /** One-line summary shown on the note; `highlights` open under Details. */
  summary: string;
  highlights: string[];
  stack: string[];
  links: JobLink[];
  /** Sticky-note paper colour. */
  color: string;
}

/** A profile link in the social section; `icon` is a brand mark in a 24×24 viewBox. */
export interface Social {
  label: string;
  handle: string;
  url: string;
  /** Opens in a new tab (web profiles); false for mailto. */
  isExternal: boolean;
  icon: TechIcon;
}

export type ProjectTab = 'gallery' | 'highlights' | 'details';
