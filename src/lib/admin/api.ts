// Client for the redbiiddsun-service admin API.
// Requests go to same-origin `/api`: vercel.json rewrites it to the API in production, vite.config.js proxies it in dev,
// so the admin token never crosses origins and the API needs no CORS for /admin.
import { goto } from '$app/navigation';
import { LOCAL_API_URL, PRODUCTION_API_URL } from '#lib/admin/api-origins.ts';

const API_BASE = '/api';
// The API's own origin (its API_PUBLIC_URL env var), where providers send OAuth callbacks. Not `/api`: that prefix only
// exists for the browser's proxied calls.
export const API_PUBLIC_URL = import.meta.env.DEV ? LOCAL_API_URL : PRODUCTION_API_URL;

export const ADMIN_HOME_PATH = '/admin';
export const LOGIN_PATH = '/admin/login';
export const PASSWORD_PATH = '/admin/password';

const TOKEN_KEY = 'admin-session-token';

const HTTP_NO_CONTENT = 204;
const HTTP_UNAUTHORIZED = 401;
const HTTP_TOO_MANY_REQUESTS = 429;
const SITES_PATH = '/admin/sites';
const JSON_CONTENT_TYPE = 'application/json';

// Match the API's validation limits.
export const MIN_PASSWORD_LENGTH = 12;
export const MAX_SITE_NAME_LENGTH = 100;

export const PROVIDERS = ['google', 'line', 'tiktok'] as const;
export type Provider = (typeof PROVIDERS)[number];

export type Admin = { id: string; email: string };
export type Site = {
  id: string;
  name: string;
  allowedOrigins: string[];
  registrationOpen: boolean;
  createdAt: string;
  updatedAt: string;
};
export type SiteInput = {
  name: string;
  allowedOrigins: string[];
  registrationOpen: boolean;
};
export type SiteUser = {
  id: string;
  email: string | null;
  createdAt: string;
  providers: string[];
};
export type ProviderConfig = {
  provider: Provider;
  clientId: string;
  enabled: boolean;
};
export type SiteKeyKind = 'publishable' | 'secret';
export type SiteKey = {
  id: string;
  kind: SiteKeyKind;
  /** The full key for publishable keys; a masked hint for secret keys. */
  displayValue: string;
  createdAt: string;
  revokedAt: string | null;
};

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

/** Session-scoped token: gone when the tab closes, and never readable by other origins. */
export const adminSession = {
  get token(): string | null {
    try {
      return sessionStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set(token: string) {
    try {
      sessionStorage.setItem(TOKEN_KEY, token);
    } catch {
      /* storage unavailable: the admin stays signed in only until the next reload */
    }
  },
  clear() {
    try {
      sessionStorage.removeItem(TOKEN_KEY);
    } catch {
      /* storage unavailable */
    }
  },
};

type ValidationBody = {
  message: string;
  errors?: { path: string; message: string }[];
};

async function readErrorMessage(response: Response) {
  if (!response.headers.get('content-type')?.includes(JSON_CONTENT_TYPE)) return response.text();

  const body: ValidationBody = await response.json();
  const paths = body.errors?.map((error) => error.path.replace(/^\//, '')).join(', ');
  return paths ? `${body.message}: ${paths}` : body.message;
}

async function request<T>(
  path: string,
  { method = 'GET', body }: { method?: string; body?: unknown } = {},
): Promise<T> {
  const headers = new Headers();
  const token = adminSession.token;
  if (token) headers.set('authorization', `Bearer ${token}`);
  if (body !== undefined) headers.set('content-type', JSON_CONTENT_TYPE);

  const response = await fetch(API_BASE + path, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  // An expired or revoked session: start over at the login page.
  if (response.status === HTTP_UNAUTHORIZED && token) {
    adminSession.clear();
    await goto(LOGIN_PATH, { replaceState: true });
  }
  if (!response.ok) throw new ApiError(response.status, await readErrorMessage(response));

  return (response.status === HTTP_NO_CONTENT ? undefined : await response.json()) as T;
}

const sitePath = (siteId: string) => `${SITES_PATH}/${encodeURIComponent(siteId)}`;
const providerPath = (siteId: string, provider: Provider) => `${sitePath(siteId)}/oauth-providers/${provider}`;

export const adminApi = {
  login: (email: string, password: string) =>
    request<{ token: string; expiresIn: number; admin: Admin }>('/admin/auth/login', {
      method: 'POST',
      body: { email, password },
    }),
  logout: () => request<void>('/admin/auth/logout', { method: 'POST' }),
  me: () => request<{ admin: Admin }>('/admin/auth/me'),
  changePassword: (currentPassword: string, newPassword: string) =>
    request<void>('/admin/auth/password', {
      method: 'POST',
      body: { currentPassword, newPassword },
    }),

  listSites: () => request<Site[]>(SITES_PATH),
  getSite: (siteId: string) => request<Site>(sitePath(siteId)),
  createSite: (input: SiteInput) => request<Site>(SITES_PATH, { method: 'POST', body: input }),
  updateSite: (siteId: string, input: SiteInput) => request<Site>(sitePath(siteId), { method: 'PATCH', body: input }),
  deleteSite: (siteId: string) => request<void>(sitePath(siteId), { method: 'DELETE' }),

  listUsers: (siteId: string) => request<SiteUser[]>(`${sitePath(siteId)}/users`),
  createUser: (siteId: string, email: string, password: string) =>
    request<{ user: SiteUser }>(`${sitePath(siteId)}/users`, {
      method: 'POST',
      body: { email, password },
    }),
  deleteUser: (siteId: string, userId: string) =>
    request<void>(`${sitePath(siteId)}/users/${encodeURIComponent(userId)}`, {
      method: 'DELETE',
    }),

  listProviders: (siteId: string) => request<ProviderConfig[]>(`${sitePath(siteId)}/oauth-providers`),
  saveProvider: (
    siteId: string,
    provider: Provider,
    config: { clientId: string; clientSecret: string; enabled: boolean },
  ) =>
    request<ProviderConfig>(providerPath(siteId, provider), {
      method: 'PUT',
      body: config,
    }),
  setProviderEnabled: (siteId: string, provider: Provider, enabled: boolean) =>
    request<ProviderConfig>(providerPath(siteId, provider), {
      method: 'PATCH',
      body: { enabled },
    }),
  deleteProvider: (siteId: string, provider: Provider) =>
    request<void>(providerPath(siteId, provider), { method: 'DELETE' }),

  listKeys: (siteId: string) => request<SiteKey[]>(`${sitePath(siteId)}/keys`),
  /** `value` is the full key; for a secret key this is the only time it is returned. */
  createKey: (siteId: string, kind: SiteKeyKind) =>
    request<{ key: SiteKey; value: string }>(`${sitePath(siteId)}/keys`, {
      method: 'POST',
      body: { kind },
    }),
  revokeKey: (siteId: string, keyId: string) =>
    request<void>(`${sitePath(siteId)}/keys/${encodeURIComponent(keyId)}`, {
      method: 'DELETE',
    }),
};

/** A message for the UI from anything a call can throw. */
export function describeError(error: unknown) {
  if (error instanceof ApiError)
    return error.status === HTTP_TOO_MANY_REQUESTS ? 'Too many attempts. Try again later.' : error.message;
  return 'Could not reach the server.';
}

/** One origin per line or comma. */
export const parseOrigins = (text: string) =>
  text
    .split(/[\n,]/)
    .map((origin) => origin.trim())
    .filter(Boolean);

/** The textarea form of `parseOrigins`' input: one origin per line. */
export const formatOrigins = (origins: string[]) => origins.join('\n');

/**
 * Lets only the most recent of overlapping loads apply its result, so a slow earlier load
 * can't overwrite data from a newer one. Call the returned `startLoad` at the start of each load.
 */
export function trackLatestLoad() {
  let latestLoadId = 0;
  return function startLoad() {
    const loadId = ++latestLoadId;
    return () => loadId === latestLoadId;
  };
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
