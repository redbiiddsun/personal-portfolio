<script lang="ts">
  import { reveal } from '#lib/actions.ts';
  import { OWNER } from '#lib/data.ts';
  import { t } from '#lib/i18n.svelte.ts';
  import ContactButton from './ContactButton.svelte';

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

<section class="final" data-theme="dark">
  <h2 class="h2" use:reveal>
    {t('final.title')} <span class="scribble-wrap"><span>{t('final.titleMark')}</span>
      <svg class="scribble" viewBox="0 0 120 14" preserveAspectRatio="none" aria-hidden="true"><path d="M3 9c22-4 52-6 114-3" /></svg></span>
  </h2>
  <p class="lead">{t('final.sub')}</p>
  <div class="final-cta" use:reveal>
    <ContactButton variant="light" isLarge />
    <span class="final-note" aria-hidden="true">
      <svg viewBox="0 0 60 40"><path class="draw" d="M56 8C40 4 20 10 10 30" /><path class="draw" d="m4 22 6 9 9-5" /></svg>
      {t('final.note')}
    </span>
  </div>
  <button class="final-copy" type="button" onclick={copyEmail}>
    {t('final.or')} <u>{OWNER.email}</u>
  </button>
  <span class="sr-only" aria-live="polite">{isCopied ? t('final.copied') : ''}</span>
  <span class="final-toast" class:on={isCopied} aria-hidden="true">{t('final.copied')} ✓</span>
</section>
