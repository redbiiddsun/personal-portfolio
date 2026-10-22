<script lang="ts">
  import { onMount } from 'svelte';
  import { heroShotImage, heroShots, logoImage } from '#lib/data.ts';
  import { t } from '#lib/i18n.svelte.ts';
  import { prefersReducedMotion } from '#lib/utils.ts';
  import RotatingWord from './RotatingWord.svelte';
  import TechStack from './TechStack.svelte';
  import ContactButton from './ContactButton.svelte';

  /** Cards below this top offset (%) get the `hc-low` treatment. */
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

  /** Card elements, exposed so the page-level intro can fly into them. */
  let { cards = $bindable([]) }: { cards?: HTMLElement[] } = $props();

  let hero: HTMLElement;
  const parallaxLayers: HTMLElement[] = [];

  /* Mouse + scroll parallax and a slow idle bob on the collage, only while the hero is visible. */
  onMount(() => {
    const reduceMotion = prefersReducedMotion();
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
        const bob = reduceMotion ? 0 : Math.sin(time / BOB_PERIOD_MS + index * BOB_PHASE_STEP) * BOB_PX * depth;
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

<section class="hero" id="top" data-theme="light" bind:this={hero}>
  <div class="hero-cards">
    {#each heroShots as card, index (card.title)}
      <div
        class="hc"
        class:hc-mid={card.isMidLayer}
        class:hc-low={card.offsetY > LOW_CARD_OFFSET}
        style="{card.side}:{card.offsetX}%;top:{card.offsetY}%;--w:{card.width}px;--h:{card.height}px;--r:{card.rotation}deg;--i:{index}"
        bind:this={cards[index]}
      >
        <div class="hc-par" bind:this={parallaxLayers[index]}>
          <div class="hc-body">
            <img class="hc-img" src={heroShotImage(card)} alt="" />
            <div class="hc-meta">
              <span class="av"><img src={logoImage(card.seed)} alt="" /><i></i></span>
              <span><b>{card.title}</b><small>{card.caption}</small></span>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
  <div class="hero-content">
    <h1 class="hero-title">
      <span>{t('hero.l1')}</span><br />
      <span>{t('hero.l2a')}</span>
      <RotatingWord />
      <span>{t('hero.l2b')}</span>
    </h1>
    <p class="hero-sub">{t('hero.sub')}</p>
    <TechStack />
    <ContactButton isLarge extraClass="hero-cta" id="heroCta" />
  </div>
  <a class="scroll-hint" href="#people">
    <span>{t('scroll')}</span>
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 7 5 5 5-5M7 13l5 5 5-5"/></svg>
  </a>
</section>
