<script lang="ts">
  import { goto } from '$app/navigation';
  import {
    adminApi,
    describeError,
    formatDate,
    MAX_SITE_NAME_LENGTH,
    parseOrigins,
    type Site,
  } from '#lib/admin/api.ts';
  import { siteHref } from '#lib/admin/site-sections.ts';
  import { ui } from '#lib/admin/ui.ts';

  let sites: Site[] = $state([]);
  let isLoading = $state(true);
  let loadError = $state('');

  let name = $state('');
  let originsText = $state('');
  let registrationOpen = $state(true);
  let createError = $state('');
  let isCreating = $state(false);
  let newSiteDialog: HTMLDialogElement;

  function openNewSiteDialog() {
    createError = '';
    newSiteDialog.showModal();
  }

  $effect(() => {
    adminApi
      .listSites()
      .then((loadedSites) => (sites = loadedSites))
      .catch((error) => (loadError = describeError(error)))
      .finally(() => (isLoading = false));
  });

  async function createSite(event: SubmitEvent) {
    event.preventDefault();
    createError = '';
    isCreating = true;
    try {
      const site = await adminApi.createSite({ name, allowedOrigins: parseOrigins(originsText), registrationOpen });
      await goto(siteHref(site.id));
    } catch (error) {
      createError = describeError(error);
    } finally {
      isCreating = false;
    }
  }
</script>

<div class="flex flex-col gap-8">
  <section class={ui.card}>
    <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
      <h1 class={ui.heading}>Sites</h1>
      <button class={ui.primary} type="button" onclick={openNewSiteDialog}>New site</button>
    </div>
    {#if isLoading}
      <p class={ui.muted}>Loading…</p>
    {:else if loadError}
      <p class={ui.error} role="alert">{loadError}</p>
    {:else if sites.length === 0}
      <p class={ui.muted}>No sites yet. Click New site to create the first one.</p>
    {:else}
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="text-ink-3">
            <tr class="border-b border-line">
              <th class="py-2 pr-4 font-medium">Name</th>
              <th class="py-2 pr-4 font-medium">Origins</th>
              <th class="py-2 pr-4 font-medium">Registration</th>
              <th class="py-2 font-medium">Created</th>
            </tr>
          </thead>
          <tbody>
            {#each sites as site (site.id)}
              <tr class="border-b border-line last:border-0">
                <td class="py-3 pr-4">
                  <a href={siteHref(site.id)} class="font-medium text-blue no-underline hover:underline">{site.name}</a>
                </td>
                <td class="py-3 pr-4 text-ink-2">{site.allowedOrigins.join(', ')}</td>
                <td class="py-3 pr-4">
                  <span class={site.registrationOpen ? ui.badgeOn : ui.badgeOff}
                    >{site.registrationOpen ? 'Open' : 'Closed'}</span
                  >
                </td>
                <td class="py-3 whitespace-nowrap text-ink-2">{formatDate(site.createdAt)}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </section>

  <!-- Native modal: focus trap, Esc to close, and the backdrop come from the browser. -->
  <dialog
    bind:this={newSiteDialog}
    class={[ui.card, 'm-auto w-[min(32rem,calc(100%-2rem))] backdrop:bg-dark/50']}
    aria-labelledby="new-site-heading"
  >
    <h2 id="new-site-heading" class={[ui.heading, 'mb-4']}>New site</h2>
    <form class="grid gap-4" onsubmit={createSite}>
      <label class={ui.label}>
        Name
        <input class={ui.input} required maxlength={MAX_SITE_NAME_LENGTH} bind:value={name} />
      </label>
      <label class={ui.label}>
        Allowed origins <span class="font-normal text-ink-3">One per line, e.g. https://example.com</span>
        <textarea class={[ui.input, 'min-h-24']} required bind:value={originsText}></textarea>
      </label>
      <label class={ui.checkbox}>
        <input type="checkbox" bind:checked={registrationOpen} /> Anyone can register
      </label>
      {#if createError}<p class={ui.error} role="alert">{createError}</p>{/if}
      <div class="flex justify-end gap-2">
        <button class={ui.secondary} type="button" onclick={() => newSiteDialog.close()}>Cancel</button>
        <button class={ui.primary} type="submit" disabled={isCreating}>Create site</button>
      </div>
    </form>
  </dialog>
</div>
