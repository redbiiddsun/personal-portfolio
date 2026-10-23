<!-- A single-path brand mark in its brand colour. Decorative unless `label` is given. -->
<script lang="ts">
  import type { ClassValue } from 'svelte/elements';
  import type { TechIcon } from '#lib/types.ts';

  let { icon, label, class: className }: { icon: TechIcon; label?: string; class?: ClassValue } = $props();
</script>

<svg
  class={className}
  viewBox="0 0 24 24"
  fill={icon.color}
  role={label ? 'img' : undefined}
  aria-label={label}
  aria-hidden={label ? undefined : 'true'}
><path d={icon.path} /></svg>
