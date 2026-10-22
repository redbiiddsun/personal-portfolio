<script lang="ts">
  import { t } from '#lib/i18n.svelte.ts';
  import Logo from './Logo.svelte';
</script>

<footer class="footer" data-theme="dark">
  <Logo />
  <!-- ponytail: placeholder links until the legal pages exist -->
  <!-- svelte-ignore a11y_invalid_attribute -->
  <nav><a href="#">{t('footer.privacy')}</a><a href="#">{t('footer.terms')}</a></nav>
  <small>© 2026 craftly. Demo build.</small>
</footer>
