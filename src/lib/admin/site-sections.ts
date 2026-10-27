// Sections of one site's admin page, shown as a sub-menu under the site in the sidebar.
export const SITE_SECTIONS = [
  { id: 'settings', label: 'Settings' },
  { id: 'keys', label: 'API keys' },
  { id: 'providers', label: 'Sign-in providers' },
  { id: 'users', label: 'Users' },
] as const;

export type SiteSection = (typeof SITE_SECTIONS)[number]['id'];

// One site's page: SITE_PATH?id=<uuid>&tab=<section>.
export const SITE_PATH = '/admin/site';
export const SITE_ID_PARAM = 'id';
export const SECTION_PARAM = 'tab';

const DEFAULT_SITE_SECTION: SiteSection = 'settings';

const isSiteSection = (value: string | null): value is SiteSection =>
  SITE_SECTIONS.some((section) => section.id === value);

/** The section in a `?tab=` value, falling back to settings for a missing or unknown one. */
export const parseSiteSection = (value: string | null): SiteSection =>
  isSiteSection(value) ? value : DEFAULT_SITE_SECTION;

export const siteHref = (siteId: string, section: SiteSection = DEFAULT_SITE_SECTION) =>
  `${SITE_PATH}?${new URLSearchParams({ [SITE_ID_PARAM]: siteId, [SECTION_PARAM]: section })}`;
