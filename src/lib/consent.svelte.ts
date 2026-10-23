import type { Consent } from "./types";
import { storage } from "./utils";

/** Read by the Google tag in app.html before it loads; keep both in sync. */
const CONSENT_STORAGE_KEY = "consent";

/** Every Google Analytics cookie name starts with this. */
const GA_COOKIE_PREFIX = "_ga";

/** GA sets its cookies on the root domain; must match SITE_URL in src/lib/data.ts. */
const GA_COOKIE_DOMAIN = ".redbiiddsun.com";

export const consentBanner = $state({ isOpen: false });

/** The element that reopened the banner, to hand focus back to once a choice is made. */
let opener: HTMLElement | null = null;

/** Lets the footer reopen the banner so visitors can change their mind. */
export const openConsentBanner = () => {
    opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    consentBanner.isOpen = true;
};

/** Show the banner until the visitor has chosen. Call on mount, so prerendered HTML has no banner. */
export const restoreConsentBanner = () => {
    consentBanner.isOpen = !storage.get(CONSENT_STORAGE_KEY);
};

/** Attachment for the banner's first button: takes focus only when the visitor reopened the banner. */
export const focusOnReopen = (button: HTMLElement) => {
    if (opener) button.focus();
};

/** Withdrawing consent must also drop the cookies GA already set, not just stop new ones. */
const removeAnalyticsCookies = () => {
    const names = document.cookie
        .split(";")
        .map((cookie) => cookie.split("=")[0].trim())
        .filter((name) => name.startsWith(GA_COOKIE_PREFIX));
    for (const name of names) {
        document.cookie = `${name}=; domain=${GA_COOKIE_DOMAIN}; path=/; max-age=0`;
        document.cookie = `${name}=; path=/; max-age=0`;
    }
};

export const setConsent = (consent: Consent) => {
    storage.set(CONSENT_STORAGE_KEY, consent);
    window.gtag?.("consent", "update", { analytics_storage: consent });
    if (consent === "denied") removeAnalyticsCookies();
    consentBanner.isOpen = false;
    opener?.focus();
    opener = null;
};
