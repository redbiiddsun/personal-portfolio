<!-- Intro: a spinning ring of shots; each one then flies to its hero-card slot. -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { heroCards, img } from '#lib/data.ts';
  import { prefersReducedMotion, wait } from '#lib/utils.ts';
  import VinylArt from './VinylArt.svelte';

  let { cards }: { cards: HTMLElement[] } = $props();

  const SKIP_IF_SCROLLED_PX = 40;
  const MAX_RADIUS_PX = 240;
  const SPIN_DEG_PER_MS = 0.05;
  const STAGGER_MS = 55;
  const MIN_SHOW_MS = 1500;
  const MAX_SHOW_MS = 3500;
  /** Size each card shrinks to while it sits in the ring. */
  const RING_ITEM_PX = 72;
  const FLY_STAGGER_MS = 35;
  const FLY_HOME_MS = 1350;
  /** Ring radius as a fraction of the viewport width / height. */
  const RADIUS_WIDTH_RATIO = 0.32;
  const RADIUS_HEIGHT_RATIO = 0.34;
  const FADE_OUT_MS = 600;

  let radius = $state(0);
  let angle = $state(0);
  let isGone = $state(false);
  let isRemoved = $state(false);
  let ring = $state<HTMLDivElement>();
  /** Replaced on mount; clicking the ring before then is a no-op. */
  let handoff = () => {};

  const slotAngle = (index: number) => (index * 360) / heroCards.length;

  /** Move every hero card onto its ring position instantly, then let it transition home. */
  const flyCardsHome = () => {
    const centerX = innerWidth / 2;
    const centerY = innerHeight / 2;
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      if (!rect.width) return; // hidden on mobile
      const degrees = slotAngle(index) + angle;
      const radians = (degrees * Math.PI) / 180;
      const startX = centerX + radius * Math.sin(radians);
      const startY = centerY - radius * Math.cos(radians);
      let rotation = ((degrees % 360) + 360) % 360;
      if (rotation > 180) rotation -= 360;
      card.style.transition = 'none';
      card.style.opacity = '1';
      card.style.transform =
        `translate(${startX - (rect.left + rect.width / 2)}px, ${startY - (rect.top + rect.height / 2)}px) ` +
        `rotate(${rotation - heroCards[index].rotation}deg) scale(${RING_ITEM_PX / rect.width})`;
    });
    document.body.offsetWidth; // commit start positions before transitioning
    cards.forEach((card, index) => {
      card.style.transition = `transform ${FLY_HOME_MS}ms var(--ease) ${index * FLY_STAGGER_MS}ms`;
      card.style.transform = '';
    });
  };

  onMount(() => {
    const body = document.body.classList;
    if (prefersReducedMotion() || scrollY > SKIP_IF_SCROLLED_PX) {
      isRemoved = true;
      body.add('ready');
      return;
    }
    body.add('intro-on');
    radius = Math.min(innerWidth * RADIUS_WIDTH_RATIO, innerHeight * RADIUS_HEIGHT_RATIO, MAX_RADIUS_PX);

    let lastTime = performance.now();
    let frame = requestAnimationFrame(function spin(time) {
      angle += (time - lastTime) * SPIN_DEG_PER_MS;
      lastTime = time;
      frame = requestAnimationFrame(spin);
    });

    let isHandedOff = false;
    handoff = () => {
      if (isHandedOff) return;
      isHandedOff = true;
      cancelAnimationFrame(frame);
      flyCardsHome();
      isGone = true;
      body.remove('intro-on');
      body.add('ready');
      setTimeout(() => (isRemoved = true), FADE_OUT_MS);
    };

    (async () => {
      await wait(0); // let the ring images render before decoding them
      const images = [...(ring?.querySelectorAll('img') ?? [])];
      const loaded = Promise.all(images.map((image) => image.decode().catch(() => {})));
      await Promise.race([Promise.all([loaded, wait(MIN_SHOW_MS)]), wait(MAX_SHOW_MS)]);
      handoff();
    })();

    return () => cancelAnimationFrame(frame);
  });
</script>

{#if !isRemoved}
  <!-- Click skips the intro; it's aria-hidden decoration, so no keyboard path is needed. -->
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
  <div
    class="intro"
    class:gone={isGone}
    style:transition={isGone ? 'none' : undefined}
    style:opacity={isGone ? '0' : undefined}
    aria-hidden="true"
    onclick={() => handoff()}
  >
    <div class="intro-ring" bind:this={ring} style:transform="rotate({angle}deg)">
      {#if radius}
        {#each heroCards as card, index (card.name)}
          <div class="ri" style="--a:{slotAngle(index)}deg;--R:{radius}px;--d:{index * STAGGER_MS}ms">
            {#if card.isVinyl}
              <VinylArt isMini />
            {:else}
              <img src={img(card.seed!, card.width * 2, card.height * 2)} alt="" />
            {/if}
          </div>
        {/each}
      {/if}
    </div>
  </div>
{/if}
