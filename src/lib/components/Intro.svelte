<!-- Intro: a Memoji greeting fades out, then a spinning ring of shots flies into the hero-card slots. -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { heroShots } from '#lib/data.ts';
  import { prefersReducedMotion, wait } from '#lib/utils.ts';
  import DevArt from './DevArt.svelte';
  import { SWEEP_COLORS } from './Sweep.svelte';

  let { cards }: { cards: HTMLElement[] } = $props();

  const SKIP_IF_SCROLLED_PX = 40;
  const MAX_RADIUS_PX = 240;
  const SPIN_DEG_PER_MS = 0.05;
  const STAGGER_MS = 55;
  const MIN_SHOW_MS = 900;
  const MAX_SHOW_MS = 2000;
  /** Size each card shrinks to while it sits in the ring. */
  const RING_ITEM_PX = 72;
  const FLY_STAGGER_MS = 35;
  const FLY_HOME_MS = 1350;
  /** Ring radius as a fraction of the viewport width / height. */
  const RADIUS_WIDTH_RATIO = 0.32;
  const RADIUS_HEIGHT_RATIO = 0.34;
  const FADE_OUT_MS = 600;
  /** Memoji fade-out duration; drives the greeting fade via `--memoji-fade`. */
  const MEMOJI_FADE_MS = 600;
  /** Give up on the greeting if it hasn't finished by now (slow network, stalled decode). */
  const MEMOJI_MAX_MS = 4500;
  const HELLO_TEXT = 'hello, I’m Sun';
  /** Single source for the signature font: used for font loading and, via `--hello-font`, by CSS. */
  const HELLO_FONT = "110px 'Sacramento', cursive";
  /**
   * Outline length of each glyph in Sacramento at 110px (measured from the font file with fontTools).
   * Each letter's dash equals its outline, so it is fully "written" exactly when its draw ends.
   */
  const HELLO_OUTLINE_LENGTHS: Record<string, number> = {
    h: 427, e: 164, l: 333, o: 201, ',': 40, I: 462, '’': 40, m: 344, S: 557, u: 186, n: 241,
  };
  /** Each letter's outline draws over this long, starting this far after the previous letter. */
  const HELLO_LETTER_DRAW_MS = 700;
  const HELLO_LETTER_STAGGER_MS = 160;
  const HELLO_FILL_MS = 500;
  /**
   * Pen width (viewBox units). Sacramento has a single thin weight; a pen this thick covers each letter's
   * outline, so the text reads as bold from the first stroke, not only once it fills in.
   */
  const HELLO_STROKE = 5;
  const HELLO_WRITTEN_MS =
    (HELLO_TEXT.length - 1) * HELLO_LETTER_STAGGER_MS + HELLO_LETTER_DRAW_MS + HELLO_FILL_MS;
  /** Once written in ink, colour fills each letter in turn, left to right, and stays. */
  const HELLO_COLOR_MS = 400;
  const HELLO_COLOR_STAGGER_MS = 80;
  /** Hold the finished, coloured greeting on screen this long before the intro fades. */
  const HELLO_HOLD_MS = 900;
  const HELLO_DURATION_MS =
    HELLO_WRITTEN_MS + (HELLO_TEXT.length - 1) * HELLO_COLOR_STAGGER_MS + HELLO_COLOR_MS + HELLO_HOLD_MS;
  /** Don't hold the intro hostage to a slow font download. */
  const HELLO_FONT_MAX_WAIT_MS = 1500;

  let radius = $state(0);
  let angle = $state(0);
  let isGone = $state(false);
  let isRemoved = $state(false);
  let ring = $state<HTMLDivElement>();
  let memoji = $state<HTMLVideoElement>();
  let isMemojiShown = $state(true);
  let isMemojiFading = $state(false);
  let isHelloDrawing = $state(false);
  /** Replaced on mount; clicking the ring before then is a no-op. */
  let handoff = () => {};

  const slotAngle = (index: number) => (index * 360) / heroShots.length;

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
        `rotate(${rotation - heroShots[index].rotation}deg) scale(${RING_ITEM_PX / rect.width})`;
    });
    document.body.offsetWidth; // commit start positions before transitioning
    cards.forEach((card, index) => {
      card.style.transition = `transform ${FLY_HOME_MS}ms var(--ease-smooth) ${index * FLY_STAGGER_MS}ms`;
      card.style.transform = '';
    });
  };

  /** Resolves when the greeting ends, or right away if it can't play (blocked autoplay, no codec). */
  const playMemoji = () =>
    new Promise<void>((resolve) => {
      if (!memoji || memoji.ended) return resolve();
      memoji.addEventListener('ended', () => resolve(), { once: true });
      memoji.play().catch(() => resolve());
      setTimeout(resolve, MEMOJI_MAX_MS);
    });

  /** Draws the hello once its script font is ready (or after a short wait); resolves when fully drawn. */
  const drawHello = async () => {
    await Promise.race([document.fonts.load(HELLO_FONT).catch(() => {}), wait(HELLO_FONT_MAX_WAIT_MS)]);
    isHelloDrawing = true;
    await wait(HELLO_DURATION_MS);
  };

  onMount(() => {
    const body = document.body.classList;
    if (prefersReducedMotion() || scrollY > SKIP_IF_SCROLLED_PX) {
      isRemoved = true;
      body.add('ready');
      return;
    }
    body.add('overflow-hidden');
    radius = Math.min(innerWidth * RADIUS_WIDTH_RATIO, innerHeight * RADIUS_HEIGHT_RATIO, MAX_RADIUS_PX);
    // Fetch the ring shots while the greeting plays, so the ring appears fully loaded.
    heroShots.forEach((shot) => {
      if ('src' in shot) new Image().src = shot.src;
    });

    let frame = 0;
    let isHandedOff = false;
    handoff = () => {
      if (isHandedOff) return;
      isHandedOff = true;
      cancelAnimationFrame(frame);
      flyCardsHome();
      isGone = true;
      body.remove('overflow-hidden');
      body.add('ready');
      setTimeout(() => (isRemoved = true), FADE_OUT_MS);
    };

    const startSpin = () => {
      let lastTime = performance.now();
      frame = requestAnimationFrame(function spin(time) {
        angle += (time - lastTime) * SPIN_DEG_PER_MS;
        lastTime = time;
        frame = requestAnimationFrame(spin);
      });
    };

    (async () => {
      await Promise.all([playMemoji(), drawHello()]);
      if (isHandedOff) return;
      isMemojiFading = true;
      await wait(MEMOJI_FADE_MS);
      if (isHandedOff) return; // skipped by a click mid-fade
      isMemojiShown = false;
      startSpin();
      await wait(0); // let the ring images render before decoding them
      const images = [...(ring?.querySelectorAll('img') ?? [])];
      const loaded = Promise.all(images.map((image) => image.decode().catch(() => {})));
      await Promise.race([Promise.all([loaded, wait(MIN_SHOW_MS)]), wait(MAX_SHOW_MS)]);
      handoff();
    })();

    return () => {
      isHandedOff = true;
      cancelAnimationFrame(frame);
    };
  });
</script>

{#if !isRemoved}
  <!-- Click skips the intro; it's aria-hidden decoration, so no keyboard path is needed. -->
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
  <div
    class={['fixed inset-0 z-100 grid cursor-pointer place-items-center bg-white transition-opacity duration-500 motion-reduce:hidden', isGone && 'pointer-events-none opacity-0']}
    style:transition={isGone ? 'none' : undefined}
    style:opacity={isGone ? '0' : undefined}
    aria-hidden="true"
    onclick={() => handoff()}
  >
    {#if isMemojiShown}
      <!-- Safari plays the HEVC-with-alpha original; other browsers skip it (unknown type) and use VP9 alpha. -->
      <div
        class={[
          'grid w-full justify-items-center transition-[opacity,scale] duration-(--memoji-fade) ease-smooth [--memoji-width:min(560px,92vw)]',
          isMemojiFading && 'scale-92 opacity-0',
        ]}
        style:--memoji-fade="{MEMOJI_FADE_MS}ms"
      >
        <video
          class="h-auto w-(--memoji-width)"
          bind:this={memoji}
          width="640"
          height="480"
          autoplay
          muted
          playsinline
          preload="auto"
        >
          <source src="/intro/memoji.mov" type={'video/quicktime; codecs="hvc1"'} />
          <source src="/intro/memoji.webm" type="video/webm" />
        </video>
        <svg
          class={['intro-hello mt-[calc(var(--memoji-width)*-.12)] w-[min(760px,94vw)] overflow-visible', isHelloDrawing && 'drawing']}
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
      </div>
    {:else}
      <div class="relative size-0" bind:this={ring} style:transform="rotate({angle}deg)">
        {#if radius}
          {#each heroShots as card, index (card.title)}
            <div class="ri absolute top-0 left-0 h-[88px] w-[72px] overflow-hidden rounded-md bg-soft shadow-[0_6px_18px_rgba(0,0,0,.14)]" style="--a:{slotAngle(index)}deg;--R:{radius}px;--d:{index * STAGGER_MS}ms">
              {#if 'src' in card}
                <img class="size-full object-cover" src={card.src} alt="" />
              {:else}
                <DevArt kind={card.art} class="h-full [--dev-text:3.5px]" />
              {/if}
            </div>
          {/each}
        {/if}
      </div>
    {/if}
  </div>
{/if}
