<script lang="ts">
  import { reveal } from '#lib/actions.ts';
  import { t } from '#lib/i18n.svelte.ts';
  import ContactButton from './ContactButton.svelte';
</script>

<section class="final" data-theme="dark">
  <h2 class="h2" use:reveal>{t('final.title')}</h2>
  <p class="lead" use:reveal>{t('final.sub')}</p>
  <ContactButton variant="light" isLarge action={reveal} />
</section>
