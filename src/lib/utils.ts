export const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Run after the browser paints the current frame (lets a CSS start state commit). */
export const afterNextPaint = (callback: () => void) =>
  requestAnimationFrame(() => requestAnimationFrame(callback));

/** localStorage that never throws (private mode, blocked storage). */
export const storage = {
  get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* storage unavailable */
    }
  },
};

/** Coalesce scroll/resize bursts into one call per animation frame. Returns a cleanup. */
export const onScrollFrame = (callback: () => void): (() => void) => {
  let frame = 0;
  const schedule = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      callback();
    });
  };
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  schedule();
  return () => {
    removeEventListener('scroll', schedule);
    removeEventListener('resize', schedule);
    cancelAnimationFrame(frame);
  };
};
