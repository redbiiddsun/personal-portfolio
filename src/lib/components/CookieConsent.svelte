<!-- Asks before analytics cookies are set; the choice feeds Google Consent Mode (see the Google tag in app.html). -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { consentBanner, focusOnReopen, restoreConsentBanner, setConsent } from '#lib/consent.svelte.ts';
  import { t } from '#lib/i18n.svelte.ts';

  onMount(restoreConsentBanner);
</script>

{#if consentBanner.isOpen}
  <div
    class="fixed right-4 bottom-4 left-4 z-60 animate-fade-up rounded-[22px] bg-white p-5 text-ink shadow-[0_1px_2px_rgba(0,0,0,.06),0_20px_50px_rgba(20,24,33,.28)] md:right-auto md:max-w-[380px]"
    role="dialog"
    aria-labelledby="cookie-consent-title"
    aria-describedby="cookie-consent-text"
  >
    <h2 class="mb-1.5 text-base font-semibold" id="cookie-consent-title">{t('consent.title')}</h2>
    <p class="mb-4 text-sm leading-[1.55] text-ink-2" id="cookie-consent-text">{t('consent.text')}</p>
    <div class="flex gap-2">
      <button
        class="rounded-full bg-dark px-[18px] py-2.5 text-sm font-medium text-white transition-[background-color] duration-200 hover:bg-ink"
        type="button"
        onclick={() => setConsent('granted')}
        {@attach focusOnReopen}
      >{t('consent.accept')}</button>
      <button
        class="rounded-full border border-line px-[18px] py-2.5 text-sm font-medium text-ink-2 transition-[border-color,color] duration-200 hover:border-ink-3 hover:text-ink"
        type="button"
        onclick={() => setConsent('denied')}
      >{t('consent.decline')}</button>
    </div>
  </div>
{/if}
