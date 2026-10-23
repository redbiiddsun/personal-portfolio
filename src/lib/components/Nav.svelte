<script lang="ts">
  import { onMount } from 'svelte';
  import { onScrollFrame } from '#lib/utils.ts';
  import ContactButton from './ContactButton.svelte';
  import { HERO_CTA_ID } from './Hero.svelte';
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
    const heroCta = document.getElementById(HERO_CTA_ID);
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

<header class="pointer-events-none fixed top-4 right-0 left-0 z-50 flex justify-center px-4">
  <div
    class={[
      'pointer-events-auto flex w-[min(984px,100%)] items-center justify-between rounded-full py-2 pr-2 pl-[22px] transition-[background-color,box-shadow,color] duration-450',
      !isAtTop && 'backdrop-blur-[18px] backdrop-saturate-140',
      isDark
        ? 'bg-[rgba(48,54,68,.62)] text-white shadow-[0_10px_30px_rgba(0,0,0,.25)]'
        : isAtTop
          ? 'bg-transparent'
          : 'bg-white/72 shadow-[0_1px_0_rgba(0,0,0,.04),0_10px_30px_rgba(20,24,33,.06)]',
    ]}
  >
    <Logo class={['-ml-3.5 px-3.5 py-2 text-[21px]', isAtTop && 'bg-white/70 backdrop-blur-[14px]']} />
    <div class="flex items-center gap-2">
      <LangSwitch {isDark} />
      <!-- Collapsed until the hero's CTA scrolls away. -->
      <span
        class={[
          'overflow-hidden transition-[max-width,opacity] duration-[.5s,.3s] ease-smooth',
          isCtaShown ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0',
        ]}
      >
        <ContactButton />
      </span>
    </div>
  </div>
</header>
