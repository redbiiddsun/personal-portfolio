<script lang="ts">
  import {
    adminApi,
    describeError,
    formatDate,
    trackLatestLoad,
    type SiteKey,
    type SiteKeyKind,
  } from '#lib/admin/api.ts';
  import { ui } from '#lib/admin/ui.ts';

  let { siteId }: { siteId: string } = $props();

  const KIND_LABELS: Record<SiteKeyKind, string> = { publishable: 'Publishable', secret: 'Secret' };
  // Copy target id for the one-time secret shown in the banner (real keys use their own id).
  const NEW_SECRET_COPY_ID = 'new-secret';

  let keys: SiteKey[] = $state([]);
  let isLoading = $state(true);
  let error = $state('');
  let isBusy = $state(false);
  // A new secret key is only returned once, so it stays on screen until dismissed.
  let newSecret = $state('');
  let copiedId = $state('');

  const activeKeys = $derived(keys.filter((key) => !key.revokedAt));

  // Only the latest load may write `keys`, so a slow first load can't wipe out a key created meanwhile.
  const startLoad = trackLatestLoad();

  async function loadKeys() {
    const isLatestLoad = startLoad();
    try {
      const loadedKeys = await adminApi.listKeys(siteId);
      if (isLatestLoad()) keys = loadedKeys;
    } catch (caught) {
      if (isLatestLoad()) error = describeError(caught);
    } finally {
      if (isLatestLoad()) isLoading = false;
    }
  }

  $effect(() => {
    loadKeys();
  });

  async function createKey(kind: SiteKeyKind) {
    error = '';
    isBusy = true;
    try {
      const { value } = await adminApi.createKey(siteId, kind);
      if (kind === 'secret') newSecret = value;
      await loadKeys();
    } catch (caught) {
      error = describeError(caught);
    } finally {
      isBusy = false;
    }
  }

  async function revokeKey(key: SiteKey) {
    if (!confirm(`Revoke this ${key.kind} key? Anything using it stops working immediately.`)) return;

    error = '';
    try {
      await adminApi.revokeKey(siteId, key.id);
      await loadKeys();
    } catch (caught) {
      error = describeError(caught);
    }
  }

  async function copyToClipboard(copyId: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      copiedId = copyId;
    } catch {
      error = "Couldn't copy. Select the key and copy it manually.";
    }
  }
</script>

<section class={ui.card}>
  <div class="mb-1 flex flex-wrap items-center justify-between gap-3">
    <h2 class={ui.heading}>API keys</h2>
    <div class="flex gap-2">
      <button class={ui.secondary} type="button" disabled={isBusy} onclick={() => createKey('publishable')}
        >New publishable key</button
      >
      <button class={ui.secondary} type="button" disabled={isBusy} onclick={() => createKey('secret')}
        >New secret key</button
      >
    </div>
  </div>
  <p class={[ui.muted, 'mb-4']}>
    <strong class="font-medium text-ink">Publishable</strong> keys go in browser code as the
    <code>X-Site-Key</code> header and only work from this site's allowed origins.
    <strong class="font-medium text-ink">Secret</strong> keys are for your server only:
    <code>Authorization: Bearer sk_…</code>.
  </p>

  {#if newSecret}
    <div class="mb-4 rounded-xl border border-[#f3d48a] bg-warn-bg p-4">
      <p class="mb-2 text-sm font-medium text-warn">Copy this secret key now. It won't be shown again.</p>
      <div class="flex flex-wrap items-center gap-2">
        <code class="min-w-0 flex-1 rounded-lg bg-paper px-3 py-2 text-sm break-all">{newSecret}</code>
        <button class={ui.secondary} type="button" onclick={() => copyToClipboard(NEW_SECRET_COPY_ID, newSecret)}>
          {copiedId === NEW_SECRET_COPY_ID ? 'Copied' : 'Copy'}
        </button>
        <button class={ui.secondary} type="button" onclick={() => (newSecret = '')}>Done</button>
      </div>
    </div>
  {/if}

  {#if error}<p class={[ui.error, 'mb-4']} role="alert">{error}</p>{/if}

  {#if isLoading}
    <p class={ui.muted}>Loading…</p>
  {:else if activeKeys.length === 0}
    <p class={ui.muted}>No keys yet.</p>
  {:else}
    <ul class="flex flex-col divide-y divide-line">
      {#each activeKeys as key (key.id)}
        <li class="flex flex-wrap items-center gap-3 py-3">
          <span class={key.kind === 'secret' ? ui.badgeWarn : ui.badgeOn}>{KIND_LABELS[key.kind]}</span>
          <code class="min-w-0 flex-1 text-sm break-all text-ink-2">{key.displayValue}</code>
          <span class="text-xs whitespace-nowrap text-ink-3">{formatDate(key.createdAt)}</span>
          {#if key.kind === 'publishable'}
            <button class={ui.secondary} type="button" onclick={() => copyToClipboard(key.id, key.displayValue)}>
              {copiedId === key.id ? 'Copied' : 'Copy'}
            </button>
          {/if}
          <button class={ui.danger} type="button" onclick={() => revokeKey(key)}>Revoke</button>
        </li>
      {/each}
    </ul>
  {/if}
</section>
