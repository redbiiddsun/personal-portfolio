<script lang="ts">
  import { adminApi, describeError, MIN_PASSWORD_LENGTH } from '#lib/admin/api.ts';
  import { ui } from '#lib/admin/ui.ts';

  let currentPassword = $state('');
  let newPassword = $state('');
  let confirmPassword = $state('');
  let error = $state('');
  let isPasswordChanged = $state(false);
  let isSubmitting = $state(false);

  async function changePassword(event: SubmitEvent) {
    event.preventDefault();
    error = '';
    isPasswordChanged = false;
    if (newPassword !== confirmPassword) {
      error = 'The new passwords do not match.';
      return;
    }

    isSubmitting = true;
    try {
      await adminApi.changePassword(currentPassword, newPassword);
      currentPassword = newPassword = confirmPassword = '';
      isPasswordChanged = true;
    } catch (caught) {
      error = describeError(caught);
    } finally {
      isSubmitting = false;
    }
  }
</script>

<section class={[ui.card, 'sm:max-w-md']}>
  <h1 class={[ui.heading, 'mb-1']}>Change password</h1>
  <p class={[ui.muted, 'mb-4']}>Every other signed-in session is signed out.</p>
  <form class="flex flex-col gap-4" onsubmit={changePassword}>
    <label class={ui.label}>
      Current password
      <input class={ui.input} type="password" autocomplete="current-password" required bind:value={currentPassword} />
    </label>
    <label class={ui.label}>
      New password <span class="font-normal text-ink-3">At least {MIN_PASSWORD_LENGTH} characters</span>
      <input
        class={ui.input}
        type="password"
        autocomplete="new-password"
        required
        minlength={MIN_PASSWORD_LENGTH}
        bind:value={newPassword}
      />
    </label>
    <label class={ui.label}>
      Confirm new password
      <input class={ui.input} type="password" autocomplete="new-password" required bind:value={confirmPassword} />
    </label>
    {#if error}<p class={ui.error} role="alert">{error}</p>{/if}
    {#if isPasswordChanged}<p class={ui.success} role="status">Password changed.</p>{/if}
    <div><button class={ui.primary} type="submit" disabled={isSubmitting}>Change password</button></div>
  </form>
</section>
