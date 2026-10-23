import type { techIcons } from './tech-icons';

export type Lang = 'en' | 'th';

/** The visitor's answer to the cookie banner; maps to Google Consent Mode's `analytics_storage`. */
export type Consent = 'granted' | 'denied';

/** User-facing content: a plain string reads the same in every language (names, brands, code). */
export type LocalText = string | Record<Lang, string>;

/** A name used in `stack` lists; every one has a logo in `techIcons`. */
export type TechKey = keyof typeof techIcons;

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
  /** Left out of the mobile collage, which only has room for one card per corner. */
  isDesktopOnly?: boolean;
  title: string;
  caption: LocalText;
}

/** `src`/`logo` are paths under /static (screenshots of the project, and its icon). */
export type HeroImageShot = HeroShotBase & { src: string; logo: string };
/** `tech` is shown as the card's icon. */
export type HeroDevShot = HeroShotBase & { art: DevArtKind; tech: TechKey };
export type HeroShot = HeroImageShot | HeroDevShot;

export interface TechIcon {
  /** Brand colour for the logo. */
  color: string;
  /** Single SVG path in a 24×24 viewBox. */
  path: string;
  /** Tile background for light brand marks that lack contrast on the default white tile. */
  tile?: string;
}

export interface Highlight {
  title: LocalText;
  detail: LocalText;
  src: string;
}

export interface ProjectStat {
  value: LocalText;
  label: LocalText;
}

export interface Project {
  id: string;
  /** Short label for the showcase list. */
  label: LocalText;
  name: string;
  logo: string;
  url?: string;
  /** Concept or mockup work, not a shipped client product. */
  isDemo?: boolean;
  year?: string;
  summary: LocalText;
  description: LocalText;
  myRole: LocalText;
  stats: ProjectStat[];
  stack: TechKey[];
  /** Screenshots under /static; the first is the cover. */
  gallery: string[];
  highlights: Highlight[];
}

export interface JobLink {
  label: LocalText;
  url: string;
}

export type Employment = 'fullTime' | 'freelance' | 'internship' | 'projectBased';

export interface Job {
  company: string;
  role: string;
  employment: Employment;
  /** Work arrangement or city, e.g. "Remote", "Hybrid", "Bangkok". */
  location: LocalText;
  /** `YYYY-MM` months; no `end` means the job is ongoing. Formatted per language on render. */
  period: { start: string; end?: string };
  /** One-line summary shown on the note; `highlights` open under Details. */
  summary: LocalText;
  highlights: LocalText[];
  stack: TechKey[];
  links: JobLink[];
  /** Sticky-note paper colour. */
  color: string;
}

/** A profile link in the social section; `icon` is a brand mark in a 24×24 viewBox. */
export interface Social {
  label: LocalText;
  handle: string;
  url: string;
  /** Opens in a new tab (web profiles); false for mailto. */
  isExternal: boolean;
  icon: TechIcon;
}

/** A row of the "whole stack" illustration in the Keep section. */
export interface StackLayer {
  label: LocalText;
  techs: TechKey[];
}
