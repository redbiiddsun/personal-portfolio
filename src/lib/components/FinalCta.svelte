<script lang="ts">
  import { reveal } from '#lib/actions.ts';
  import { OWNER } from '#lib/data.ts';
  import { t } from '#lib/i18n.svelte.ts';
  import ContactButton from './ContactButton.svelte';
  import Scribble from './Scribble.svelte';

  const COPIED_RESET_MS = 2000;

  let isCopied = $state(false);
  let resetTimer: ReturnType<typeof setTimeout> | undefined;

  $effect(() => () => clearTimeout(resetTimer));

  /* Fallback for visitors without a mail client. */
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(OWNER.email);
    } catch {
      return; // Clipboard blocked (insecure context): the Email button above still works.
    }
    isCopied = true;
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => (isCopied = false), COPIED_RESET_MS);
  };
</script>

<section class="px-4 pt-40 pb-[140px] text-center text-on-dark" data-theme="dark">
  <h2 class="h2" use:reveal>
    {t('final.title')} <span class="relative inline-block"><span>{t('final.titleMark')}</span>
      <Scribble class="w-full stroke-blue" /></span>
  </h2>
  <p class="lead mb-[38px] text-on-dark-2">{t('final.sub')}</p>
  <div class="relative inline-block" use:reveal>
    <ContactButton variant="light" isLarge />
    <span
      class="absolute -top-[34px] left-[calc(100%+12px)] flex -rotate-4 items-start gap-1 font-script text-[26px] leading-none whitespace-nowrap text-on-dark opacity-0 transition-opacity delay-1000 duration-500 ease-smooth in-[.is-in]:opacity-100 max-md:hidden"
      aria-hidden="true"
    >
      <svg
        class="mt-3.5 h-8 w-12 fill-none stroke-current stroke-2 *:[stroke-dasharray:80] *:[stroke-dashoffset:80] *:transition-[stroke-dashoffset] *:delay-1200 *:duration-800 *:ease-smooth in-[.is-in]:*:[stroke-dashoffset:0]"
        stroke-linecap="round"
        stroke-linejoin="round"
        viewBox="0 0 60 40"><path d="M56 8C40 4 20 10 10 30" /><path d="m4 22 6 9 9-5" /></svg
      >
      {t('final.note')}
    </span>
  </div>
  <button class="group mx-auto mt-[22px] block px-2 py-1 text-[15px] text-on-dark-2" type="button" onclick={copyEmail}>
    {t('final.or')} <u class="decoration-white/30 underline-offset-3 transition-colors duration-200 group-hover:text-on-dark group-hover:decoration-current">{OWNER.email}</u>
  </button>
  <span class="sr-only" aria-live="polite">{isCopied ? t('final.copied') : ''}</span>
  <span
    class={['mt-1.5 block h-[22px] font-script text-[22px] text-blue transition-opacity duration-300', isCopied ? 'opacity-100' : 'opacity-0']}
    aria-hidden="true"
  >{t('final.copied')} ✓</span>
</section>
