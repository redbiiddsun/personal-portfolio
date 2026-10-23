import type { Consent } from "./types";
import { storage } from "./utils";

/** Read by the Google tag and Clarity in app.html before they load; keep both in sync. */
const CONSENT_STORAGE_KEY = "consent";

/** Cookie name prefixes set by Google Analytics (`_ga…`) and Microsoft Clarity (`_clck`, `_clsk`). */
const ANALYTICS_COOKIE_PREFIXES = ["_ga", "_clck", "_clsk"];

/** Both tools set their cookies on the root domain; must match SITE_URL in src/lib/data.ts. */
const ANALYTICS_COOKIE_DOMAIN = ".redbiiddsun.com";

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

/** Withdrawing consent must also drop the cookies already set, not just stop new ones. */
const removeAnalyticsCookies = () => {
    const names = document.cookie
        .split(";")
        .map((cookie) => cookie.split("=")[0].trim())
        .filter((name) => ANALYTICS_COOKIE_PREFIXES.some((prefix) => name.startsWith(prefix)));
    for (const name of names) {
        document.cookie = `${name}=; domain=${ANALYTICS_COOKIE_DOMAIN}; path=/; max-age=0`;
        document.cookie = `${name}=; path=/; max-age=0`;
    }
};

export const setConsent = (consent: Consent) => {
    storage.set(CONSENT_STORAGE_KEY, consent);
    window.gtag?.("consent", "update", { analytics_storage: consent });
    window.clarity?.("consentv2", { ad_Storage: "denied", analytics_Storage: consent });
    if (consent === "denied") removeAnalyticsCookies();
    consentBanner.isOpen = false;
    opener?.focus();
    opener = null;
};
