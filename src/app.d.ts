declare global {
  interface Window {
    /** Google tag; only defined on the production host (see app.html). */
    gtag?: (...args: unknown[]) => void;
  }
}

export {};
