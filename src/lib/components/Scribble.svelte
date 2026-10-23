<!-- Hand-drawn underline that draws in once its parent is revealed (`.scribble` in style.css). -->
<script lang="ts">
  import type { ClassValue } from 'svelte/elements';

  let { class: className }: { class?: ClassValue } = $props();
</script>

<svg
  class={['scribble absolute -bottom-[.22em] left-0 h-[.3em] fill-none stroke-3', className]}
  stroke-linecap="round"
  viewBox="0 0 120 14"
  preserveAspectRatio="none"
  aria-hidden="true"
><path d="M3 9c22-4 52-6 114-3" /></svg>
