export type Lang = 'en' | 'th';

export interface HeroCard {
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
  seed?: string;
  isVinyl?: boolean;
  isMidLayer?: boolean;
  name: string;
  role: string;
  city: string;
  avatarId: number;
}

export interface Article {
  seed: string;
  title: string;
  excerpt: string;
  readMinutes: number;
}

export interface PortfolioTile {
  seed?: string;
  height?: number;
  price?: string;
  isVinyl?: boolean;
  article?: Article;
}

export interface Service {
  title: string;
  price: string;
  soldCount: number;
  rating: number;
  ratingCount: number;
  seed: string;
}

export type Banner =
  | { type: 'composer' }
  | { type: 'ai' }
  | { type: 'image'; seed: string };

export interface Role {
  id: string;
  role: string;
  name: string;
  handle: string;
  followers: string;
  avatarId: number;
  bio: string;
  stats: { earned: string; orders: number; rehires: number; rating: number };
  banner: Banner;
  tags: string[];
  city: string;
  portfolio: PortfolioTile[];
  services: Service[];
  skills: string[];
}

export interface Review {
  name: string;
  avatarId: number;
  text: string;
  postedAgo: string;
}

export interface StickyNote {
  color: string;
  leftPercent: number;
  topPx: number;
  rotation: number;
  text: Record<Lang, string>;
}

export type ProfileTab = 'portfolio' | 'services' | 'reviews' | 'about';
