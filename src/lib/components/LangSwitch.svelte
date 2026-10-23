<script lang="ts">
  import { locale, setLang } from '#lib/i18n.svelte.ts';
  import type { Lang } from '#lib/types.ts';

  let { isDark = false }: { isDark?: boolean } = $props();

  const options: { lang: Lang; label: string }[] = [
    { lang: 'en', label: 'English' },
    { lang: 'th', label: 'ไทย' },
  ];

  let isOpen = $state(false);

  const choose = (lang: Lang) => {
    setLang(lang);
    isOpen = false;
  };
</script>

<svelte:document
  onclick={() => (isOpen = false)}
  onkeydown={(event) => {
    if (event.key === 'Escape') isOpen = false;
  }}
/>

<div class="relative">
  <button
    class={[
      'inline-flex h-[46px] items-center gap-1.5 rounded-full border px-3.5 text-sm font-semibold transition-[background-color,border-color] duration-300',
      isDark ? 'border-white/16 bg-white/14' : 'border-line bg-white/80',
    ]}
    aria-haspopup="listbox"
    aria-expanded={isOpen}
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
  <ul
    class={[
      'absolute top-[calc(100%+8px)] right-0 min-w-[150px] origin-top-right rounded-2xl bg-white p-1.5 text-ink shadow-[0_16px_40px_rgba(20,24,33,.16)] transition duration-200 ease-smooth',
      !isOpen && 'pointer-events-none -translate-y-1.5 scale-98 opacity-0',
    ]}
    role="listbox"
  >
    {#each options as option (option.lang)}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <li
        class="cursor-pointer rounded-[10px] px-3 py-2.5 text-[15px] hover:bg-soft aria-selected:font-semibold aria-selected:after:float-right aria-selected:after:text-blue aria-selected:after:content-['✓']"
        role="option" aria-selected={locale.lang === option.lang} onclick={() => choose(option.lang)}>
        {option.label}
      </li>
    {/each}
  </ul>
</div>
