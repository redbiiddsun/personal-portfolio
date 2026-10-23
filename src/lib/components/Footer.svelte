<script lang="ts">
  import { MAILTO_HREF, OWNER } from '#lib/data.ts';
  import { t } from '#lib/i18n.svelte.ts';
  import { openConsentBanner } from '#lib/consent.svelte.ts';
  import Logo from './Logo.svelte';

  /** Fixed at prerender time, so it moves on with each build. */
  const COPYRIGHT_YEAR = new Date().getFullYear();
</script>

<footer
  class="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-5 border-t border-white/10 px-6 pt-[30px] pb-10 text-sm text-on-dark-2"
  data-theme="dark"
>
  <Logo class="text-[18px] text-white" />
  <nav class="flex gap-[22px]">
    <a class="no-underline hover:text-white" href={MAILTO_HREF}>{OWNER.email}</a>
    <button class="hover:text-white" type="button" onclick={openConsentBanner}>{t('consent.settings')}</button>
  </nav>
  <small>© {COPYRIGHT_YEAR} {OWNER.name}</small>
</footer>
