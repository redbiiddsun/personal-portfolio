<script lang="ts">
  import { goto } from '$app/navigation';
  import { ADMIN_HOME_PATH, adminApi, adminSession, describeError } from '#lib/admin/api.ts';
  import { ui } from '#lib/admin/ui.ts';

  let email = $state('');
  let password = $state('');
  let error = $state('');
  let isSubmitting = $state(false);

  async function login(event: SubmitEvent) {
    event.preventDefault();
    error = '';
    isSubmitting = true;
    try {
      const { token } = await adminApi.login(email, password);
      adminSession.set(token);
      await goto(ADMIN_HOME_PATH, { replaceState: true });
    } catch (caught) {
      error = describeError(caught);
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="mx-auto max-w-sm">
  <form class="flex flex-col gap-4 rounded-[28px] bg-paper p-7 shadow-[0_20px_60px_rgba(0,0,0,.35)]" onsubmit={login}>
    <div class="mb-1">
      <h1 class="text-2xl font-semibold tracking-[-.02em]">Welcome back</h1>
      <p class={[ui.muted, 'mt-1']}>Sign in to manage your sites.</p>
    </div>
    <label class={ui.label}>
      Email
      <input class={ui.input} type="email" autocomplete="username" required bind:value={email} />
    </label>
    <label class={ui.label}>
      Password
      <input class={ui.input} type="password" autocomplete="current-password" required bind:value={password} />
    </label>
    {#if error}<p class={ui.error} role="alert">{error}</p>{/if}
    <button class={ui.primary} type="submit" disabled={isSubmitting}>{isSubmitting ? 'Signing in…' : 'Sign in'}</button>
  </form>
</div>
