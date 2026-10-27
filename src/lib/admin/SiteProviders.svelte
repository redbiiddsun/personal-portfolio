<script lang="ts">
  import {
    adminApi,
    API_PUBLIC_URL,
    describeError,
    PROVIDERS,
    type Provider,
    type ProviderConfig,
  } from '#lib/admin/api.ts';
  import { ui } from '#lib/admin/ui.ts';

  let { siteId }: { siteId: string } = $props();

  const PROVIDER_LABELS: Record<Provider, string> = { google: 'Google', line: 'LINE', tiktok: 'TikTok' };
  // TikTok calls the client id a "client key".
  const CLIENT_ID_LABELS: Record<Provider, string> = { google: 'Client ID', line: 'Channel ID', tiktok: 'Client key' };
  const CLIENT_SECRET_LABELS: Record<Provider, string> = {
    google: 'Client secret',
    line: 'Channel secret',
    tiktok: 'Client secret',
  };

  let configs: Partial<Record<Provider, ProviderConfig>> = $state({});
  let isLoading = $state(true);
  let error = $state('');
  let editingProvider: Provider | null = $state(null);
  let clientId = $state('');
  let clientSecret = $state('');
  let isBusy = $state(false);

  const callbackUrl = (provider: Provider) => `${API_PUBLIC_URL}/oauth/${provider}/callback`;

  $effect(() => {
    adminApi
      .listProviders(siteId)
      .then(
        (providerConfigs) => (configs = Object.fromEntries(providerConfigs.map((config) => [config.provider, config]))),
      )
      .catch((caught) => (error = describeError(caught)))
      .finally(() => (isLoading = false));
  });

  function startEditing(provider: Provider) {
    editingProvider = provider;
    clientId = configs[provider]?.clientId ?? '';
    // The API never returns the secret, so it is always typed again.
    clientSecret = '';
    error = '';
  }

  async function runAction(action: () => Promise<void>) {
    error = '';
    isBusy = true;
    try {
      await action();
    } catch (caught) {
      error = describeError(caught);
    } finally {
      isBusy = false;
    }
  }

  const saveProvider = (event: SubmitEvent, provider: Provider) => {
    event.preventDefault();
    return runAction(async () => {
      const enabled = configs[provider]?.enabled ?? true;
      configs[provider] = await adminApi.saveProvider(siteId, provider, { clientId, clientSecret, enabled });
      editingProvider = null;
    });
  };

  const setProviderEnabled = (provider: Provider, enabled: boolean) =>
    runAction(async () => {
      configs[provider] = await adminApi.setProviderEnabled(siteId, provider, enabled);
    });

  const removeProvider = (provider: Provider) => {
    if (
      !confirm(`Remove ${PROVIDER_LABELS[provider]} sign-in? Its users can't sign in with it until it is set up again.`)
    )
      return;
    return runAction(async () => {
      await adminApi.deleteProvider(siteId, provider);
      delete configs[provider];
    });
  };
</script>

<section class={ui.card}>
  <h2 class={[ui.heading, 'mb-1']}>Sign-in providers</h2>
  <p class={[ui.muted, 'mb-4']}>
    Each provider uses this site's own app. Register the callback URL shown below in the provider's console.
  </p>

  {#if error}<p class={[ui.error, 'mb-4']} role="alert">{error}</p>{/if}

  {#if isLoading}
    <p class={ui.muted}>Loading…</p>
  {:else}
    <ul class="flex flex-col divide-y divide-line">
      {#each PROVIDERS as provider (provider)}
        {@const config = configs[provider]}
        <li class="py-4 first:pt-0 last:pb-0">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <span class="font-medium">{PROVIDER_LABELS[provider]}</span>
              {#if !config}
                <span class={ui.badgeOff}>Not set up</span>
              {:else if config.enabled}
                <span class={ui.badgeOn}>Enabled</span>
              {:else}
                <span class={ui.badgeWarn}>Disabled</span>
              {/if}
            </div>
            <div class="flex flex-wrap gap-2">
              {#if config}
                <button
                  class={ui.secondary}
                  type="button"
                  disabled={isBusy}
                  onclick={() => setProviderEnabled(provider, !config.enabled)}
                >
                  {config.enabled ? 'Disable' : 'Enable'}
                </button>
              {/if}
              <button class={ui.secondary} type="button" disabled={isBusy} onclick={() => startEditing(provider)}>
                {config ? 'Change credentials' : 'Set up'}
              </button>
              {#if config}
                <button class={ui.danger} type="button" disabled={isBusy} onclick={() => removeProvider(provider)}
                  >Remove</button
                >
              {/if}
            </div>
          </div>
          {#if config}<p class={[ui.muted, 'mt-1']}>{CLIENT_ID_LABELS[provider]}: {config.clientId}</p>{/if}
          <p class="mt-1 text-xs break-all text-ink-3">Callback URL: <code>{callbackUrl(provider)}</code></p>

          {#if editingProvider === provider}
            <form
              class="mt-4 grid gap-3 rounded-xl bg-soft p-4 sm:grid-cols-2"
              onsubmit={(event) => saveProvider(event, provider)}
            >
              <label class={ui.label}>
                {CLIENT_ID_LABELS[provider]}
                <input class={ui.input} required autocomplete="off" bind:value={clientId} />
              </label>
              <label class={ui.label}>
                {CLIENT_SECRET_LABELS[provider]}
                <input class={ui.input} type="password" required autocomplete="off" bind:value={clientSecret} />
              </label>
              <div class="flex gap-2 sm:col-span-2">
                <button class={ui.primary} type="submit" disabled={isBusy}>Save</button>
                <button class={ui.secondary} type="button" onclick={() => (editingProvider = null)}>Cancel</button>
              </div>
            </form>
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</section>
