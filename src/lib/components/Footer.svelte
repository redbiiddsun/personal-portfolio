<script lang="ts">
  import { MAILTO_HREF, OWNER } from '#lib/data.ts';
  import Logo from './Logo.svelte';
</script>

<footer class="footer" data-theme="dark">
  <Logo />
  <nav><a href={MAILTO_HREF}>{OWNER.email}</a></nav>
  <small>© 2026 {OWNER.name}</small>
</footer>
