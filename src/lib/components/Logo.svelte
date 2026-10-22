<script lang="ts">
  import { OWNER } from '#lib/data.ts';
</script>

<a class="logo" href="#top" aria-label="{OWNER.nickname} ({OWNER.name}), home">
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5c.6 4.6 2.9 6.9 7.5 7.5-4.6.6-6.9 2.9-7.5 7.5-.6-4.6-2.9-6.9-7.5-7.5 4.6-.6 6.9-2.9 7.5-7.5Z"/><circle cx="18.5" cy="18.5" r="2.2"/></svg>
  <span>{OWNER.nickname}</span>
</a>
