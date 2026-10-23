<script lang="ts">
  import { onMount } from 'svelte';
  import { rotatingWords } from '#lib/data.ts';
  import { localize } from '#lib/i18n.svelte.ts';
  import { afterNextPaint, prefersReducedMotion } from '#lib/utils.ts';

  const ROTATE_EVERY_MS = 2400;
  const LEAVE_MS = 750;

  let slot: HTMLSpanElement;

  // ponytail: imperative crossfade — two words overlap mid-animation and the slot width
  // must track the incoming word's measured width, which is simplest done on the DOM.
  onMount(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    let wordIndex = 0;
    document.fonts.ready.then(() => {
      slot.style.width = `${(slot.firstElementChild as HTMLElement).offsetWidth}px`;
      if (prefersReducedMotion()) return;
      timer = setInterval(() => {
        wordIndex = (wordIndex + 1) % rotatingWords.length;
        const leaving = slot.querySelector('.word:not(.out)')!;
        const entering = document.createElement('span');
        entering.className = 'word in';
        entering.textContent = localize(rotatingWords[wordIndex]);
        slot.appendChild(entering);
        slot.style.width = `${entering.offsetWidth}px`;
        leaving.classList.add('out');
        afterNextPaint(() => entering.classList.remove('in'));
        setTimeout(() => leaving.remove(), LEAVE_MS);
      }, ROTATE_EVERY_MS);
    });
    return () => clearInterval(timer);
  });
</script>

<span
  class="relative inline-block h-[1.15em] align-top transition-[width] duration-650 ease-swap"
  bind:this={slot}
><span class="word">{localize(rotatingWords[0])}</span></span>
