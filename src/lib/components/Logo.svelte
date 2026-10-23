<script lang="ts">
  import type { ClassValue } from 'svelte/elements';
  import { OWNER } from '#lib/data.ts';

  let { class: className }: { class?: ClassValue } = $props();
</script>

<a
  class={['inline-flex items-center gap-[7px] rounded-full font-semibold tracking-[-.02em] no-underline transition-[background-color] duration-400', className]}
  href="#top"
  aria-label="{OWNER.nickname} ({OWNER.name}), home"
>
  <img class="size-[30px]" src="/logo.webp" alt="" width="30" height="30" />
  <span>{OWNER.nickname}</span>
</a>
