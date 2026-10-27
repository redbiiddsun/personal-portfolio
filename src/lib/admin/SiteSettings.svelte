<script lang="ts">
  import { goto } from '$app/navigation';
  import {
    ADMIN_HOME_PATH,
    adminApi,
    describeError,
    formatDate,
    formatOrigins,
    MAX_SITE_NAME_LENGTH,
    parseOrigins,
    type Site,
  } from '#lib/admin/api.ts';
  import { ui } from '#lib/admin/ui.ts';

  let { site, onSaved }: { site: Site; onSaved: (site: Site) => void } = $props();

  // Form state starts from the loaded site; the parent passes a fresh site after each save.
  // svelte-ignore state_referenced_locally
  let name = $state(site.name);
  // svelte-ignore state_referenced_locally
  let originsText = $state(formatOrigins(site.allowedOrigins));
  // svelte-ignore state_referenced_locally
  let registrationOpen = $state(site.registrationOpen);
  let error = $state('');
  let isSaved = $state(false);
  let isBusy = $state(false);

  async function saveSite(event: SubmitEvent) {
    event.preventDefault();
    error = '';
    isSaved = false;
    isBusy = true;
    try {
      const saved = await adminApi.updateSite(site.id, {
        name,
        allowedOrigins: parseOrigins(originsText),
        registrationOpen,
      });
      originsText = formatOrigins(saved.allowedOrigins);
      onSaved(saved);
      isSaved = true;
    } catch (caught) {
      error = describeError(caught);
    } finally {
      isBusy = false;
    }
  }

  async function deleteSite() {
    if (!confirm(`Delete "${site.name}"? Every signed-in user of this site is signed out.`)) return;

    error = '';
    isSaved = false;
    isBusy = true;
    try {
      await adminApi.deleteSite(site.id);
      await goto(ADMIN_HOME_PATH, { replaceState: true });
    } catch (caught) {
      error = describeError(caught);
      isBusy = false;
    }
  }
</script>

<section class={ui.card}>
  <div class="mb-4 flex flex-wrap items-baseline justify-between gap-2">
    <h1 class={ui.heading}>{site.name}</h1>
    <span class="text-xs text-ink-3">Updated {formatDate(site.updatedAt)} · ID {site.id}</span>
  </div>
  <form class="grid gap-4 sm:max-w-lg" onsubmit={saveSite}>
    <label class={ui.label}>
      Name
      <input class={ui.input} required maxlength={MAX_SITE_NAME_LENGTH} bind:value={name} />
    </label>
    <label class={ui.label}>
      Allowed origins <span class="font-normal text-ink-3">Websites that may call the auth API, one per line</span>
      <textarea class={[ui.input, 'min-h-24']} required bind:value={originsText}></textarea>
    </label>
    <label class={ui.checkbox}>
      <input type="checkbox" bind:checked={registrationOpen} /> Anyone can register
    </label>
    {#if error}<p class={ui.error} role="alert">{error}</p>{/if}
    {#if isSaved}<p class={ui.success} role="status">Saved.</p>{/if}
    <div class="flex flex-wrap gap-3">
      <button class={ui.primary} type="submit" disabled={isBusy}>Save</button>
      <button class={ui.danger} type="button" disabled={isBusy} onclick={deleteSite}>Delete site</button>
    </div>
  </form>
</section>
