<!-- Splits a keyword into graphemes so colour can ripple through it (see `.sweep` in style.css). -->
<script lang="ts" module>
  /** Shared with the intro signature so both colour ripples use the same palette. */
  export const SWEEP_COLORS = ['#8ab4f8', '#4f86f7', '#a970ff', '#f04fb0', '#ff7a45', '#ffb84d'];
</script>

<script lang="ts">
  import { locale } from '#lib/i18n.svelte.ts';

  let { text }: { text: string } = $props();

  const graphemes = $derived(
    typeof Intl.Segmenter === 'function'
      ? [...new Intl.Segmenter(locale.lang, { granularity: 'grapheme' }).segment(text)].map((part) => part.segment)
      : Array.from(text),
  );
</script>

<span class="sweep font-semibold text-white">{#each graphemes as grapheme, index (index)}{#if grapheme === ' '}{' '}{:else}<span style="--i:{index};--c:{SWEEP_COLORS[index % SWEEP_COLORS.length]}">{grapheme}</span>{/if}{/each}</span>
