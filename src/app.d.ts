declare global {
  interface Window {
    /** Google tag; only defined on the production host (see app.html). */
    gtag?: (...args: unknown[]) => void;
    /** Microsoft Clarity; only defined on the production host (see app.html). */
    clarity?: (...args: unknown[]) => void;
  }
}

export {};
