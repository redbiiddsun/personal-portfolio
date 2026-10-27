<!-- One site: /admin/site?id=<uuid>&tab=<section>. Query params, not a [id] route, so the static build needs no per-site pages. -->
<script lang="ts">
  import { page } from '$app/state';
  import { ADMIN_HOME_PATH, adminApi, describeError, type Site } from '#lib/admin/api.ts';
  import { parseSiteSection, SECTION_PARAM, SITE_ID_PARAM } from '#lib/admin/site-sections.ts';
  import SiteKeys from '#lib/admin/SiteKeys.svelte';
  import SiteProviders from '#lib/admin/SiteProviders.svelte';
  import SiteSettings from '#lib/admin/SiteSettings.svelte';
  import SiteUsers from '#lib/admin/SiteUsers.svelte';
  import { ui } from '#lib/admin/ui.ts';

  const siteId = $derived(page.url.searchParams.get(SITE_ID_PARAM) ?? '');
  const section = $derived(parseSiteSection(page.url.searchParams.get(SECTION_PARAM)));

  let site: Site | null = $state(null);
  let loadError = $state('');

  $effect(() => {
    site = null;
    loadError = '';
    if (!siteId) {
      loadError = 'No site selected.';
      return;
    }
    // Discard a response that arrives after the user has already switched to another site.
    let isStale = false;
    adminApi
      .getSite(siteId)
      .then((loadedSite) => {
        if (!isStale) site = loadedSite;
      })
      .catch((error) => {
        if (!isStale) loadError = describeError(error);
      });
    return () => {
      isStale = true;
    };
  });
</script>

<nav class="mb-4 flex items-center gap-1.5 text-sm text-ink-3" aria-label="Breadcrumb">
  <a href={ADMIN_HOME_PATH} class="text-ink-2 no-underline hover:text-ink">All sites</a>
  {#if site}<span>/</span><span class="truncate text-ink">{site.name}</span>{/if}
</nav>

{#if loadError}
  <p class={ui.error} role="alert">{loadError}</p>
{:else if !site}
  <p class={ui.muted}>Loading…</p>
{:else if section === 'settings'}
  <SiteSettings {site} onSaved={(saved) => (site = saved)} />
{:else if section === 'keys'}
  <SiteKeys siteId={site.id} />
{:else if section === 'providers'}
  <SiteProviders siteId={site.id} />
{:else}
  <SiteUsers siteId={site.id} />
{/if}
