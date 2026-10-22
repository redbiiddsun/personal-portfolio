import type { Action } from 'svelte/action';

const REVEAL_THRESHOLD = 0.25;
const IN_VIEW_THRESHOLD = 0.35;

/** Adds `is-in` the first time the element scrolls into view, then calls `onReveal`. */
export const reveal: Action<HTMLElement, (() => void) | undefined> = (node, onReveal) => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      node.classList.add('is-in');
      onReveal?.();
      observer.disconnect();
    },
    { threshold: REVEAL_THRESHOLD },
  );
  observer.observe(node);
  return { destroy: () => observer.disconnect() };
};

/** Toggles `in-view` every time the element enters/leaves view, so entrances replay. */
export const inView: Action<HTMLElement> = (node) => {
  const observer = new IntersectionObserver(
    ([entry]) => node.classList.toggle('in-view', entry.isIntersecting),
    { threshold: IN_VIEW_THRESHOLD },
  );
  observer.observe(node);
  return { destroy: () => observer.disconnect() };
};
