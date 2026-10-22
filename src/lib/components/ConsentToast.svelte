<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from '#lib/i18n.svelte.ts';
  import { storage } from '#lib/utils.ts';

  const ACCEPTED_STORAGE_KEY = 'terms-accepted';
  const SHOW_AFTER_MS = 2500;

  let isShown = $state(false);

  onMount(() => {
    if (storage.get(ACCEPTED_STORAGE_KEY)) return;
    const timer = setTimeout(() => (isShown = true), SHOW_AFTER_MS);
    return () => clearTimeout(timer);
  });

  const accept = () => {
    isShown = false;
    storage.set(ACCEPTED_STORAGE_KEY, '1');
  };
</script>

<div class="consent" role="dialog" aria-labelledby="consentTitle" hidden={!isShown}>
  <b id="consentTitle">{t('consent.title')}</b>
  <p>{t('consent.body')}</p>
  <button class="btn btn-dark" onclick={accept}><span>{t('consent.btn')}</span></button>
</div>
