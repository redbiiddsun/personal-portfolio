<script lang="ts">
  import { afterNextPaint } from '#lib/utils.ts';

  let { value }: { value: string } = $props();

  const LEAVE_MS = 520;

  let box: HTMLDivElement;

  // ponytail: old and new digits overlap while flipping, so the DOM is driven by hand.
  $effect(() => {
    if (!value) return;
    const leaving = box.querySelector('span:not(.leave)');
    const entering = document.createElement('span');
    entering.textContent = value;
    box.appendChild(entering);
    if (!leaving) return;
    entering.className = 'enter';
    leaving.classList.add('leave');
    afterNextPaint(() => entering.classList.remove('enter'));
    setTimeout(() => leaving.remove(), LEAVE_MS);
  });
</script>

<div class="cd-num" bind:this={box}></div>
