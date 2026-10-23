<script lang="ts">
  import { locale, setLang } from '#lib/i18n.svelte.ts';
  import type { Lang } from '#lib/types.ts';

  let { isDark = false }: { isDark?: boolean } = $props();

  const options: { lang: Lang; label: string }[] = [
    { lang: 'en', label: 'English' },
    { lang: 'th', label: 'ไทย' },
  ];

  let isOpen = $state(false);
  let toggleButton: HTMLButtonElement;
  let menu: HTMLUListElement;

  // Closing hides the menu, so focus inside it must return to the toggle.
  const choose = (lang: Lang) => {
    setLang(lang);
    isOpen = false;
    toggleButton.focus();
  };
</script>

<svelte:document
  onclick={() => (isOpen = false)}
  onkeydown={(event) => {
    if (event.key !== 'Escape' || !isOpen) return;
    isOpen = false;
    if (menu.contains(document.activeElement)) toggleButton.focus();
  }}
/>

<div class="relative">
  <button
    bind:this={toggleButton}
    class={[
      'inline-flex h-[46px] items-center gap-1.5 rounded-full border px-3.5 text-sm font-semibold transition-[background-color,border-color] duration-300',
      isDark ? 'border-white/16 bg-white/14' : 'border-line bg-white/80',
    ]}
    aria-expanded={isOpen}
    aria-controls="lang-options"
    onclick={(event) => {
      event.stopPropagation();
      isOpen = !isOpen;
    }}
  >
    <svg class="size-4 fill-none stroke-current stroke-[1.7]" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.6 5.7 3.6 9s-1.1 6.3-3.6 9c-2.5-2.7-3.6-5.7-3.6-9S9.5 5.7 12 3Z"/></svg>
    <span>{locale.lang.toUpperCase()}</span>
    <svg
      class={['h-4 w-3.5 fill-none stroke-current stroke-[1.7] transition-transform duration-250', isOpen && 'rotate-180']}
      viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg>
  </button>
  <!-- `invisible` (not just transparent) keeps the closed menu out of the tab order and the a11y tree. -->
  <ul
    bind:this={menu}
    id="lang-options"
    class={[
      'absolute top-[calc(100%+8px)] right-0 min-w-[150px] origin-top-right rounded-2xl bg-white p-1.5 text-ink shadow-[0_16px_40px_rgba(20,24,33,.16)] transition-[opacity,translate,scale,visibility] duration-200 ease-smooth',
      !isOpen && 'invisible -translate-y-1.5 scale-98 opacity-0',
    ]}
  >
    {#each options as option (option.lang)}
      <li>
        <button
          class="w-full rounded-[10px] px-3 py-2.5 text-left text-[15px] hover:bg-soft aria-pressed:font-semibold aria-pressed:after:float-right aria-pressed:after:text-blue aria-pressed:after:content-['✓']"
          type="button"
          lang={option.lang}
          aria-pressed={locale.lang === option.lang}
          onclick={() => choose(option.lang)}
        >{option.label}</button>
      </li>
    {/each}
  </ul>
</div>
