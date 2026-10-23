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

<section class="relative h-[calc(100vh*7.2)]" id="showcase" data-theme="light" bind:this={section}>
  <div
    class="sticky top-0 mx-auto grid h-screen max-w-[1340px] grid-cols-[280px_minmax(0,1fr)] items-center gap-6 px-6 pt-24 pb-6 max-[900px]:grid-cols-1 max-[900px]:grid-rows-[auto_1fr] max-[900px]:items-stretch max-[900px]:gap-3 max-[900px]:px-4 max-[900px]:pt-[84px] max-[900px]:pb-4"
  >
    <div class="relative flex h-full items-center max-[900px]:h-auto max-[900px]:overflow-x-auto max-[900px]:[scrollbar-width:none]">
      <nav
        class={[
          'grid transition-[transform,opacity,translate] duration-[.7s,.6s,.7s] ease-smooth max-[900px]:grid-flow-col max-[900px]:gap-2 max-[900px]:transform-none!',
          isIntro && '-translate-x-[30px] opacity-0',
        ]}
        aria-label="Projects" style:transform="translateY({listOffset}px)">
        {#each projects as project, index (project.id)}
          <button
            class={[
              'h-14 origin-left pl-1 text-left text-[25px] whitespace-nowrap transition-[scale,color,opacity] duration-500 ease-smooth max-[900px]:h-[38px] max-[900px]:rounded-full max-[900px]:px-3.5 max-[900px]:text-sm',
              index === activeIndex
                ? 'scale-132 font-medium text-ink max-[900px]:scale-100 max-[900px]:bg-ink max-[900px]:text-white'
                : 'text-ink-3 hover:text-ink-2 max-[900px]:bg-soft',
            ]}
            style:opacity={Math.max(MIN_LIST_OPACITY, 1 - Math.abs(index - activeIndex) * LIST_OPACITY_FALLOFF)}
            onclick={() => scrollToProject(index)}
          >
            {project.label}
          </button>
        {/each}
      </nav>
    </div>
    <article
      class={[
        'relative h-[min(80vh,760px)] overflow-hidden rounded-[28px] bg-white px-[30px] pt-[30px] shadow-[0_0_0_9px_#f1f2f4,0_20px_60px_rgba(20,24,33,.08)] transition-[translate] duration-800 ease-smooth [mask-image:linear-gradient(#000_85%,transparent)] max-[900px]:h-auto max-[900px]:px-[18px] max-[900px]:pt-5',
        isIntro && '-translate-x-[152px] max-[900px]:translate-x-0',
      ]}
    >
      <div
        class={['transition-[opacity,translate] duration-[.25s,.35s] ease-smooth', isSwapping && 'translate-y-2.5 opacity-0']}
      >
        <ProjectCard project={projects[shownIndex]} bind:tab />
      </div>
    </article>
  </div>
</section>
