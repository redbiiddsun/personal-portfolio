<!-- Pinned, scroll-driven project showcase: scrolling through the section steps through projects. -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { projects } from '#lib/data.ts';
  import type { ProjectTab } from '#lib/types.ts';
  import { onScrollFrame, prefersReducedMotion } from '#lib/utils.ts';
  import ProjectCard from './ProjectCard.svelte';

  const LIST_BUTTON_HEIGHT_PX = 56;
  const SWAP_MS = 220;
  const MIN_LIST_OPACITY = 0.35;
  const LIST_OPACITY_FALLOFF = 0.18;
  /** Fraction of the viewport scrolled before the first project starts. */
  const INTRO_VIEWPORT_RATIO = 0.5;
  /** Nudge past a project's start so a click lands inside it, not on the boundary. */
  const SCROLL_NUDGE_PX = 4;
  const WARM_IMAGES_DELAY_MS = 1200;
  /** Fraction of the intro scroll after which the intro state ends. */
  const INTRO_EXIT_RATIO = 0.7;

  let section: HTMLElement;
  let activeIndex = $state(0);
  let shownIndex = $state(0);
  let tab = $state<ProjectTab>('gallery');
  let isIntro = $state(true);
  let isSwapping = $state(false);

  let swapTimer: ReturnType<typeof setTimeout> | undefined;

  const listOffset = $derived(
    (projects.length * LIST_BUTTON_HEIGHT_PX) / 2 - (activeIndex * LIST_BUTTON_HEIGHT_PX + LIST_BUTTON_HEIGHT_PX / 2),
  );

  const measureShowcase = () => {
    const top = section.getBoundingClientRect().top + scrollY;
    const total = section.offsetHeight - innerHeight;
    const introEnd = innerHeight * INTRO_VIEWPORT_RATIO;
    return { top, total, introEnd, perProject: (total - introEnd) / projects.length };
  };

  const activate = (index: number) => {
    if (index === activeIndex) return;
    activeIndex = index;
    clearTimeout(swapTimer);
    isSwapping = true;
    swapTimer = setTimeout(() => {
      shownIndex = index;
      tab = 'gallery';
      isSwapping = false;
    }, SWAP_MS);
  };

  const scrollToProject = (index: number) => {
    const { top, introEnd, perProject } = measureShowcase();
    scrollTo({
      top: top + introEnd + perProject * index + SCROLL_NUDGE_PX,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  // Warm the cache for the other projects so swaps don't flash empty tiles.
  const warmImages = () => {
    const urls = projects.flatMap((project) => [
      ...project.gallery.map((tile) => tile.src),
      ...project.highlights.map((highlight) => highlight.src),
      ...(project.banner.type === 'image' ? [project.banner.src] : []),
      project.logo,
    ]);
    const whenIdle = window.requestIdleCallback ?? ((callback: () => void) => setTimeout(callback, WARM_IMAGES_DELAY_MS));
    whenIdle(() => urls.forEach((url) => (new Image().src = url)));
  };

  onMount(() => {
    if (document.readyState === 'complete') warmImages();
    else addEventListener('load', warmImages, { once: true });

    const stopListening = onScrollFrame(() => {
      const { top, total, introEnd, perProject } = measureShowcase();
      const scrolled = scrollY - top;
      isIntro = scrolled < introEnd * INTRO_EXIT_RATIO;
      const index = Math.min(projects.length - 1, Math.max(0, Math.floor((scrolled - introEnd) / perProject)));
      activate(index);
      if (scrolled > 0 && scrolled < total) {
        const hash = `#project-${projects[index].id}`;
        if (location.hash !== hash) goto(hash, { replace: true, shallow: true });
      }
    });
    return () => {
      stopListening();
      clearTimeout(swapTimer);
      removeEventListener('load', warmImages);
    };
  });
</script>

<section class="showcase" class:is-intro={isIntro} id="showcase" data-theme="light" bind:this={section}>
  <div class="sc-sticky">
    <div class="sc-left">
      <nav class="sc-roles" aria-label="Projects" style:transform="translateY({listOffset}px)">
        {#each projects as project, index (project.id)}
          <button
            class="sc-role"
            class:active={index === activeIndex}
            style:opacity={Math.max(MIN_LIST_OPACITY, 1 - Math.abs(index - activeIndex) * LIST_OPACITY_FALLOFF)}
            onclick={() => scrollToProject(index)}
          >
            {project.label}
          </button>
        {/each}
      </nav>
    </div>
    <article class="sc-card">
      <div class="sc-inner" class:swap={isSwapping}>
        <ProjectCard project={projects[shownIndex]} bind:tab />
      </div>
    </article>
  </div>
</section>
