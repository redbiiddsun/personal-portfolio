<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from '#lib/i18n.svelte.ts';
  import { openSignup } from '#lib/signup.svelte.ts';
  import { onScrollFrame } from '#lib/utils.ts';
  import LangSwitch from './LangSwitch.svelte';
  import Logo from './Logo.svelte';

  const AT_TOP_PX = 40;
  const CTA_SHOW_PX = 60;
  /** Sample point (from the viewport top) that decides the nav's light/dark theme. */
  const THEME_PROBE_PX = 48;

  let isAtTop = $state(true);
  let isCtaShown = $state(false);
  let isDark = $state(false);

  onMount(() => {
    const themedSections = [...document.querySelectorAll<HTMLElement>('main [data-theme]')];
    const heroCta = document.getElementById('heroCta');
    return onScrollFrame(() => {
      isAtTop = scrollY < AT_TOP_PX;
      isCtaShown = (heroCta?.getBoundingClientRect().bottom ?? 0) < CTA_SHOW_PX;
      const current = themedSections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= THEME_PROBE_PX && rect.bottom > THEME_PROBE_PX;
      });
      isDark = current?.dataset.theme === 'dark';
    });
  });
</script>

<header class="nav" class:at-top={isAtTop} class:show-cta={isCtaShown} class:dark={isDark}>
  <div class="nav-pill">
    <Logo />
    <div class="nav-right">
      <LangSwitch />
      <button class="btn btn-dark nav-cta" onclick={openSignup}><span>{t('cta')}</span></button>
    </div>
  </div>
</header>
