// Admin pages run only in the browser: they need the session token and live API data.
// Prerendering still emits an HTML shell per route for the static host.
export const ssr = false;
