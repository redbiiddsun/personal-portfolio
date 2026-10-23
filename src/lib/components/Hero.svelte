<script lang="ts" module>
  /** The hero's call to action; the nav shows its own once this scrolls away. */
  export const HERO_CTA_ID = 'heroCta';
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { heroShots } from '#lib/data.ts';
  import { localize, t } from '#lib/i18n.svelte.ts';
  import { techIcons } from '#lib/tech-icons.ts';
  import { prefersReducedMotion } from '#lib/utils.ts';
  import BrandIcon from './BrandIcon.svelte';
  import DevArt from './DevArt.svelte';
  import RotatingWord from './RotatingWord.svelte';
  import TechStack from './TechStack.svelte';
  import ContactButton from './ContactButton.svelte';

  /** Cards below this top offset (%) drop to the bottom edge on mobile. */
  const LOW_CARD_OFFSET = 60;
  const POINTER_EASING = 0.06;
  const POINTER_SHIFT_PX = 18;
  const SCROLL_SHIFT_X = 0.12;
  const SCROLL_SHIFT_Y = 0.22;
  const BOB_PX = 5;
  /** Divisor applied to the frame time; larger means a slower bob. */
  const BOB_PERIOD_MS = 1500;
  /** Per-card phase offset so neighbouring cards don't bob in sync. */
  const BOB_PHASE_STEP = 1.7;
  const CARD_IMAGE_CLASS = 'h-[calc(var(--h)*var(--k,1))] w-full rounded-[9px]';

  /** Card elements, exposed so the page-level intro can fly into them. */
  let { cards = $bindable([]) }: { cards?: HTMLElement[] } = $props();

  let hero: HTMLElement;
  const parallaxLayers: HTMLElement[] = [];

  /* Mouse + scroll parallax and a slow idle bob on the collage, only while the hero is visible. */
  onMount(() => {
    if (prefersReducedMotion()) return;
    let targetX = 0;
    let targetY = 0;
    let pointerX = 0;
    let pointerY = 0;
    let isRunning = false;

    const onPointerMove = (event: PointerEvent) => {
      targetX = (event.clientX / innerWidth - 0.5) * 2;
      targetY = (event.clientY / innerHeight - 0.5) * 2;
    };
    const tick = (time: number) => {
      pointerX += (targetX - pointerX) * POINTER_EASING;
      pointerY += (targetY - pointerY) * POINTER_EASING;
      parallaxLayers.forEach((layer, index) => {
        const { depth, side } = heroShots[index];
        const direction = side === 'left' ? -1 : 1;
        const bob = Math.sin(time / BOB_PERIOD_MS + index * BOB_PHASE_STEP) * BOB_PX * depth;
        const x = -pointerX * depth * POINTER_SHIFT_PX + direction * scrollY * depth * SCROLL_SHIFT_X;
        const y = -pointerY * depth * POINTER_SHIFT_PX - scrollY * depth * SCROLL_SHIFT_Y + bob;
        layer.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      });
      if (isRunning) requestAnimationFrame(tick);
    };

    addEventListener('pointermove', onPointerMove, { passive: true });
    const observer = new IntersectionObserver(([entry]) => {
      isRunning = entry.isIntersecting;
      if (isRunning) requestAnimationFrame(tick);
    });
    observer.observe(hero);
    return () => {
      isRunning = false;
      observer.disconnect();
      removeEventListener('pointermove', onPointerMove);
    };
  });
</script>

<section class="relative grid min-h-[max(100svh,720px)] place-items-center overflow-clip max-md:min-h-svh" id="top" data-theme="light" bind:this={hero}>
  <div class="pointer-events-none absolute inset-0">
    {#each heroShots as card, index (card.title)}
      <div
        class={[
          'absolute w-[calc(var(--w)*var(--k,1))] opacity-0 transition-opacity duration-700 will-change-transform in-[.ready]:opacity-100 max-md:[--k:.58]',
          card.isDesktopOnly && 'max-md:hidden',
          /* Mobile: pin each remaining card to a corner, inside the screen edges and clear of the fixed nav. */
          card.side === 'left' ? 'max-md:left-3!' : 'max-md:right-3!',
          card.offsetY > LOW_CARD_OFFSET ? 'max-md:top-auto! max-md:-bottom-20' : 'max-md:top-[88px]!',
        ]}
        style="{card.side}:{card.offsetX}%;top:{card.offsetY}%;--w:{card.width}px;--h:{card.height}px;--r:{card.rotation}deg;--i:{index}"
        bind:this={cards[index]}
      >
        <div class="will-change-transform" bind:this={parallaxLayers[index]}>
          <div class="rotate-(--r) rounded-[14px] bg-white px-[7px] pt-[7px] pb-2.5 shadow-[0_1px_2px_rgba(0,0,0,.06),0_14px_34px_rgba(20,24,33,.12)]">
            {#if 'src' in card}
              <img class="{CARD_IMAGE_CLASS} bg-soft object-cover" src={card.src} alt="" />
            {:else}
              <DevArt kind={card.art} class={CARD_IMAGE_CLASS} />
            {/if}
            <div class="flex items-center gap-2 px-0.5 pt-2 max-md:hidden">
              {#if 'src' in card}
                <span class="relative flex-none"><img class="size-[26px] rounded-full object-cover" src={card.logo} alt="" /><i class="absolute -right-px -bottom-px size-[9px] rounded-full border-2 border-white bg-[#22a447]"></i></span>
              {:else}
                <span class="flex-none"><BrandIcon icon={techIcons[card.tech]} class="size-[26px] rounded-full bg-soft p-1" /></span>
              {/if}
              <span class="min-w-0"><b class="block truncate text-[11.5px] font-semibold">{card.title}</b><small class="block truncate text-[9.5px] text-ink-3">{localize(card.caption)}</small></span>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
  <!-- Mobile padding: 220px clears the corner cards pinned at 88px, 72px clears the scroll hint; together they fit a 667px-tall screen. -->
  <div
    class="relative z-2 max-w-[760px] px-4 pt-[120px] pb-20 text-center *:translate-y-[18px] *:opacity-0 *:transition-[opacity,translate] *:duration-900 *:ease-smooth in-[.ready]:*:translate-y-0 in-[.ready]:*:opacity-100 [&>:nth-child(2)]:delay-100 [&>:nth-child(3)]:delay-200 [&>:nth-child(4)]:delay-300 max-md:pt-[220px] max-md:pb-[72px]"
  >
    <h1 class="mb-[22px] text-[clamp(40px,5.6vw,74px)] leading-[1.15] font-medium tracking-[-.025em]">
      <span>{t('hero.l1')}</span><br />
      <span>{t('hero.l2a')}</span>
      <RotatingWord />
      <span>{t('hero.l2b')}</span>
    </h1>
    <p class="mb-[30px] text-[clamp(15px,1.3vw,17px)] text-ink-2">{t('hero.sub')}</p>
    <TechStack />
    <ContactButton isLarge id={HERO_CTA_ID} />
  </div>
  <a class="absolute bottom-[26px] left-1/2 z-2 grid -translate-x-1/2 justify-items-center gap-1 text-sm text-ink-3 no-underline" href="#people">
    <span>{t('scroll')}</span>
    <svg class="size-4 animate-bob fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 7 5 5 5-5M7 13l5 5 5-5"/></svg>
  </a>
</section>
