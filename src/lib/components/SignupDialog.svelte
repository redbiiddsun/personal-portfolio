<!-- Sign-up dialog (front-end only: nothing is sent anywhere). -->
<script lang="ts">
  import { roles } from '#lib/data.ts';
  import { signup } from '#lib/signup.svelte.ts';

  type Field = 'name' | 'email' | 'role';

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const roleOptions = [...roles.map((role) => role.role), 'Something else'];

  let dialog: HTMLDialogElement;
  const fields: Partial<Record<Field, HTMLInputElement | HTMLSelectElement>> = {};
  const form = $state({ name: '', email: '', role: '' });
  let error = $state('');
  let signedUpName = $state('');

  const validate = (): { field: Field; message: string } | null => {
    if (!form.name.trim()) return { field: 'name', message: 'Please add your name.' };
    if (!EMAIL_PATTERN.test(form.email)) return { field: 'email', message: 'That email doesn’t look right.' };
    if (!form.role) return { field: 'role', message: 'Pick what you do — you can change it later.' };
    return null;
  };

  const submit = (event: SubmitEvent) => {
    event.preventDefault();
    const problem = validate();
    if (problem) {
      error = problem.message;
      fields[problem.field]?.focus();
      return;
    }
    signedUpName = form.name.trim().split(' ')[0];
  };

  const reset = () => {
    Object.assign(form, { name: '', email: '', role: '' });
    error = '';
    signedUpName = '';
  };

  $effect(() => {
    if (!signup.isOpen || dialog.open) return;
    if (signedUpName) reset(); // a finished sign-up reopens as a fresh form
    dialog.showModal();
  });
</script>

<!-- Clicking the backdrop (the dialog element itself) closes it; Esc is handled natively. -->
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
  class="modal"
  bind:this={dialog}
  onclose={() => (signup.isOpen = false)}
  onclick={(event) => {
    if (event.target === dialog) dialog.close();
  }}
>
  <form method="dialog" class="modal-close-form"><button class="modal-x" aria-label="Close">×</button></form>
  <div class="modal-body">
    {#if signedUpName}
      <div class="done">
        <div class="tick">✓</div>
        <h3>You’re in, {signedUpName}!</h3>
        <p>We’ll email you a link to finish your profile.</p>
      </div>
    {:else}
      <h3>Create your profile</h3>
      <p>Show the world what you can do. Takes about two minutes.</p>
      <form novalidate onsubmit={submit}>
        <label>Name<input name="name" autocomplete="name" required bind:value={form.name} bind:this={fields.name} /></label>
        <label>Email<input name="email" type="email" autocomplete="email" required bind:value={form.email} bind:this={fields.email} /></label>
        <label>What do you do?
          <select name="role" required bind:value={form.role} bind:this={fields.role}>
            <option value="">Choose one</option>
            {#each roleOptions as option (option)}<option>{option}</option>{/each}
          </select>
        </label>
        <p class="form-err" role="alert">{error}</p>
        <button class="btn btn-dark btn-lg" type="submit">Continue</button>
      </form>
    {/if}
  </div>
</dialog>
