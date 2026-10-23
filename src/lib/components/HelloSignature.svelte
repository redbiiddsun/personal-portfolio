<!-- Signature-style "hello": letters are written in ink, then colour fills them one by one (`.intro-hello` in style.css). -->
<script lang="ts" module>
  import { OWNER } from '#lib/data.ts';

  const HELLO_TEXT = `hello, I’m ${OWNER.nickname}`;
  /** Single source for the signature font: used for font loading and, via `--hello-font`, by CSS. */
  export const HELLO_FONT = "110px 'Sacramento', cursive";
  /** Each letter's outline draws over this long, starting this far after the previous letter. */
  const HELLO_LETTER_DRAW_MS = 700;
  const HELLO_LETTER_STAGGER_MS = 160;
  const HELLO_FILL_MS = 500;
  const HELLO_WRITTEN_MS =
    (HELLO_TEXT.length - 1) * HELLO_LETTER_STAGGER_MS + HELLO_LETTER_DRAW_MS + HELLO_FILL_MS;
  /** Once written in ink, colour fills each letter in turn, left to right, and stays. */
  const HELLO_COLOR_MS = 400;
  const HELLO_COLOR_STAGGER_MS = 80;
  /** Hold the finished, coloured greeting on screen this long before the intro fades. */
  const HELLO_HOLD_MS = 900;
  /** From `isDrawing` turning on until the greeting is finished and has been held. */
  export const HELLO_DURATION_MS =
    HELLO_WRITTEN_MS + (HELLO_TEXT.length - 1) * HELLO_COLOR_STAGGER_MS + HELLO_COLOR_MS + HELLO_HOLD_MS;
</script>

<script lang="ts">
  import { SWEEP_COLORS } from './Sweep.svelte';

  let { isDrawing, class: className }: { isDrawing: boolean; class?: string } = $props();

  /**
   * Outline length of each glyph in Sacramento at 110px (measured from the font file with fontTools).
   * Each letter's dash equals its outline, so it is fully "written" exactly when its draw ends.
   * Covers the letters of HELLO_TEXT; re-measure any new letter if `OWNER.nickname` changes.
   */
  const HELLO_OUTLINE_LENGTHS: Record<string, number> = {
    h: 427, e: 164, l: 333, o: 201, ',': 40, I: 462, '’': 40, m: 344, S: 557, u: 186, n: 241,
  };
  /**
   * Pen width (viewBox units). Sacramento has a single thin weight; a pen this thick covers each letter's
   * outline, so the text reads as bold from the first stroke, not only once it fills in.
   */
  const HELLO_STROKE = 5;
</script>

<svg
  class={['intro-hello overflow-visible', isDrawing && 'drawing', className]}
  viewBox="0 0 760 130"
  style:--hello-font={HELLO_FONT}
  style:--hello-stroke={HELLO_STROKE}
  style:--letter-draw="{HELLO_LETTER_DRAW_MS}ms"
  style:--letter-stagger="{HELLO_LETTER_STAGGER_MS}ms"
  style:--fill="{HELLO_FILL_MS}ms"
  style:--fill-delay="{HELLO_WRITTEN_MS - HELLO_FILL_MS}ms"
  style:--color="{HELLO_COLOR_MS}ms"
  style:--color-delay="{HELLO_WRITTEN_MS}ms"
  style:--color-stagger="{HELLO_COLOR_STAGGER_MS}ms"
>
  <text x="380" y="95" text-anchor="middle">{#each HELLO_TEXT as letter, index (index)}<tspan style:--i={index} style:--outline={HELLO_OUTLINE_LENGTHS[letter] ?? 0} style:--c={SWEEP_COLORS[index % SWEEP_COLORS.length]}>{letter}</tspan>{/each}</text>
</svg>
