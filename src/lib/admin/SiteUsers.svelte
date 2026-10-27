<script lang="ts">
  import {
    adminApi,
    describeError,
    formatDate,
    MIN_PASSWORD_LENGTH,
    trackLatestLoad,
    type SiteUser,
  } from '#lib/admin/api.ts';
  import { ui } from '#lib/admin/ui.ts';

  let { siteId }: { siteId: string } = $props();

  let users: SiteUser[] = $state([]);
  let isLoading = $state(true);
  let error = $state('');

  let email = $state('');
  let password = $state('');
  let addError = $state('');
  let isAdding = $state(false);

  // Only the latest load may write `users`, so a slow first load can't wipe out a user added meanwhile.
  const startLoad = trackLatestLoad();

  async function loadUsers() {
    const isLatestLoad = startLoad();
    try {
      const loadedUsers = await adminApi.listUsers(siteId);
      if (isLatestLoad()) users = loadedUsers;
    } catch (caught) {
      if (isLatestLoad()) error = describeError(caught);
    } finally {
      if (isLatestLoad()) isLoading = false;
    }
  }

  $effect(() => {
    loadUsers();
  });

  async function addUser(event: SubmitEvent) {
    event.preventDefault();
    addError = '';
    isAdding = true;
    try {
      await adminApi.createUser(siteId, email, password);
      email = password = '';
      await loadUsers();
    } catch (caught) {
      addError = describeError(caught);
    } finally {
      isAdding = false;
    }
  }

  async function deleteUser(user: SiteUser) {
    if (!confirm(`Delete ${user.email ?? 'this user'}? They are signed out everywhere on this site.`)) return;

    try {
      await adminApi.deleteUser(siteId, user.id);
      await loadUsers();
    } catch (caught) {
      error = describeError(caught);
    }
  }
</script>

<section class={ui.card}>
  <h2 class={[ui.heading, 'mb-4']}>Users <span class="text-sm font-normal text-ink-3">{users.length}</span></h2>

  {#if error}<p class={[ui.error, 'mb-4']} role="alert">{error}</p>{/if}

  {#if isLoading}
    <p class={ui.muted}>Loading…</p>
  {:else if users.length === 0}
    <p class={ui.muted}>No users yet.</p>
  {:else}
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead class="text-ink-3">
          <tr class="border-b border-line">
            <th class="py-2 pr-4 font-medium">Email</th>
            <th class="py-2 pr-4 font-medium">Signs in with</th>
            <th class="py-2 pr-4 font-medium">Joined</th>
            <th class="py-2"><span class="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {#each users as user (user.id)}
            <tr class="border-b border-line last:border-0">
              <td class="py-3 pr-4">{user.email ?? '—'}</td>
              <td class="py-3 pr-4">
                <div class="flex flex-wrap gap-1">
                  {#if user.email && user.providers.length === 0}<span class={ui.badgeOff}>password</span>{/if}
                  {#each user.providers as provider (provider)}<span class={ui.badgeOff}>{provider}</span>{/each}
                </div>
              </td>
              <td class="py-3 pr-4 whitespace-nowrap text-ink-2">{formatDate(user.createdAt)}</td>
              <td class="py-3 text-right">
                <button type="button" class={ui.dangerLink} onclick={() => deleteUser(user)}>Delete</button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}

  <form class="mt-6 grid gap-3 border-t border-line pt-6 sm:grid-cols-[1fr_1fr_auto] sm:items-end" onsubmit={addUser}>
    <label class={ui.label}>
      Email
      <input class={ui.input} type="email" required autocomplete="off" bind:value={email} />
    </label>
    <label class={ui.label}>
      Password <span class="font-normal text-ink-3">At least {MIN_PASSWORD_LENGTH} characters</span>
      <input
        class={ui.input}
        type="password"
        required
        minlength={MIN_PASSWORD_LENGTH}
        autocomplete="new-password"
        bind:value={password}
      />
    </label>
    <button class={ui.secondary} type="submit" disabled={isAdding}>Add user</button>
    {#if addError}<p class={[ui.error, 'sm:col-span-3']} role="alert">{addError}</p>{/if}
  </form>
</section>
