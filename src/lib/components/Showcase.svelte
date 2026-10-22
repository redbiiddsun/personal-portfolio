<!-- Pinned, scroll-driven profile showcase: scrolling through the section steps through roles. -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { avatar, bannerImage, portfolioImage, roles, serviceImage } from '#lib/data.ts';
  import { playSamplePad } from '#lib/sample-audio.ts';
  import type { ProfileTab } from '#lib/types.ts';
  import { onScrollFrame, prefersReducedMotion } from '#lib/utils.ts';
  import ProfileCard from './ProfileCard.svelte';

  const ROLE_BUTTON_HEIGHT_PX = 56;
  const SWAP_MS = 220;
  const MIN_ROLE_OPACITY = 0.35;
  const ROLE_OPACITY_FALLOFF = 0.18;
  /** Fraction of the viewport scrolled before the first role starts. */
  const INTRO_VIEWPORT_RATIO = 0.5;
  /** Nudge past a role's start so a click lands inside it, not on the boundary. */
  const SCROLL_NUDGE_PX = 4;
  const WARM_IMAGES_DELAY_MS = 1200;
  /** Fraction of the intro scroll after which the intro state ends. */
  const INTRO_EXIT_RATIO = 0.7;

  let section: HTMLElement;
  let activeIndex = $state(0);
  let shownIndex = $state(0);
  let tab = $state<ProfileTab>('portfolio');
  let isIntro = $state(true);
  let isSwapping = $state(false);
  let stopAudio = $state<(() => void) | null>(null);

  let swapTimer: ReturnType<typeof setTimeout> | undefined;

  const listOffset = $derived(
    (roles.length * ROLE_BUTTON_HEIGHT_PX) / 2 - (activeIndex * ROLE_BUTTON_HEIGHT_PX + ROLE_BUTTON_HEIGHT_PX / 2),
  );

  const silence = () => {
    stopAudio?.();
    stopAudio = null;
  };

  const toggleAudio = () => {
    if (stopAudio) silence();
    else stopAudio = playSamplePad();
  };

  const measureShowcase = () => {
    const top = section.getBoundingClientRect().top + scrollY;
    const total = section.offsetHeight - innerHeight;
    const introEnd = innerHeight * INTRO_VIEWPORT_RATIO;
    return { top, total, introEnd, perRole: (total - introEnd) / roles.length };
  };

  const activate = (index: number) => {
    if (index === activeIndex) return;
    activeIndex = index;
    silence();
    clearTimeout(swapTimer);
    isSwapping = true;
    swapTimer = setTimeout(() => {
      shownIndex = index;
      tab = 'portfolio';
      isSwapping = false;
    }, SWAP_MS);
  };

  const scrollToRole = (index: number) => {
    const { top, introEnd, perRole } = measureShowcase();
    scrollTo({
      top: top + introEnd + perRole * index + SCROLL_NUDGE_PX,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  // Warm the cache for the other profiles so swaps don't flash empty tiles.
  const warmImages = () => {
    const urls = roles.flatMap((role) => [
      ...role.portfolio.flatMap((tile) => (tile.seed && tile.height ? [portfolioImage(tile.seed, tile.height)] : [])),
      ...role.services.map(serviceImage),
      ...(role.banner.type === 'image' ? [bannerImage(role.banner.seed)] : []),
      avatar(role.avatarId),
    ]);
    const whenIdle = window.requestIdleCallback ?? ((callback: () => void) => setTimeout(callback, WARM_IMAGES_DELAY_MS));
    whenIdle(() => urls.forEach((url) => (new Image().src = url)));
  };

  onMount(() => {
    if (document.readyState === 'complete') warmImages();
    else addEventListener('load', warmImages, { once: true });

    const stopListening = onScrollFrame(() => {
      const { top, total, introEnd, perRole } = measureShowcase();
      const scrolled = scrollY - top;
      isIntro = scrolled < introEnd * INTRO_EXIT_RATIO;
      const index = Math.min(roles.length - 1, Math.max(0, Math.floor((scrolled - introEnd) / perRole)));
      activate(index);
      if (scrolled > 0 && scrolled < total) {
        const hash = `#profile-showcase-${roles[index].id}`;
        if (location.hash !== hash) goto(hash, { replace: true, shallow: true });
      }
    });
    return () => {
      stopListening();
      clearTimeout(swapTimer);
      silence();
      removeEventListener('load', warmImages);
    };
  });
</script>

<section class="showcase" class:is-intro={isIntro} id="showcase" data-theme="light" bind:this={section}>
  <div class="sc-sticky">
    <div class="sc-left">
      <nav class="sc-roles" aria-label="Profile examples" style:transform="translateY({listOffset}px)">
        {#each roles as role, index (role.id)}
          <button
            class="sc-role"
            class:active={index === activeIndex}
            style:opacity={Math.max(MIN_ROLE_OPACITY, 1 - Math.abs(index - activeIndex) * ROLE_OPACITY_FALLOFF)}
            onclick={() => scrollToRole(index)}
          >
            {role.role}
          </button>
        {/each}
      </nav>
    </div>
    <article class="sc-card">
      <div class="sc-inner" class:swap={isSwapping}>
        <ProfileCard
          role={roles[shownIndex]}
          roleIndex={shownIndex}
          bind:tab
          isPlaying={stopAudio !== null}
          onToggleAudio={toggleAudio}
        />
      </div>
    </article>
  </div>
</section>
