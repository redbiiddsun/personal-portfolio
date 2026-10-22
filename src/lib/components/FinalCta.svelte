<script lang="ts">
  import { reveal } from '#lib/actions.ts';
  import { t } from '#lib/i18n.svelte.ts';
  import { openSignup } from '#lib/signup.svelte.ts';
</script>

<section class="final" data-theme="dark">
  <h2 class="h2" use:reveal>{t('final.title')}</h2>
  <p class="lead" use:reveal>{t('final.sub')}</p>
  <button class="btn btn-light btn-lg" use:reveal onclick={openSignup}><span>{t('cta')}</span></button>
</section>
