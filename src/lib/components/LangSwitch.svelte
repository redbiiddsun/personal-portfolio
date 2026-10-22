<script lang="ts">
  import { locale, setLang } from '#lib/i18n.svelte.ts';
  import type { Lang } from '#lib/types.ts';

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

<div class="lang" class:open={isOpen}>
  <button
    class="lang-btn"
    aria-haspopup="listbox"
    aria-expanded={isOpen}
    onclick={(event) => {
      event.stopPropagation();
      isOpen = !isOpen;
    }}
  >
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.6 5.7 3.6 9s-1.1 6.3-3.6 9c-2.5-2.7-3.6-5.7-3.6-9S9.5 5.7 12 3Z"/></svg>
    <span class="lang-cur">{locale.lang.toUpperCase()}</span>
    <svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg>
  </button>
  <ul class="lang-menu" role="listbox">
    {#each options as option (option.lang)}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <li role="option" aria-selected={locale.lang === option.lang} onclick={() => choose(option.lang)}>
        {option.label}
      </li>
    {/each}
  </ul>
</div>
