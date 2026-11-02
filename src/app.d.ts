interface ImportMetaEnv {
  /** Origin of redbiiddsun-service; falls back to DEV_API_URL when unset. */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface Window {
    /** Google tag; only defined on the production host (see app.html). */
    gtag?: (...args: unknown[]) => void;
    /** Microsoft Clarity; only defined on the production host (see app.html). */
    clarity?: (...args: unknown[]) => void;
  }
}

export {};
