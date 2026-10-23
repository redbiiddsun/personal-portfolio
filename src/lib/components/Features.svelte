<script lang="ts">
  import { onMount } from 'svelte';
  import { inView, reveal } from '#lib/actions.ts';
  import { projects, searchQueries, skills, socials } from '#lib/data.ts';
  import { localize, t } from '#lib/i18n.svelte.ts';
  import { techIcons } from '#lib/tech-icons.ts';
  import { prefersReducedMotion, wait } from '#lib/utils.ts';
  import BrandIcon from './BrandIcon.svelte';
  import Sweep from './Sweep.svelte';

  const TYPE_DELAY_MS = 70;
  const ERASE_DELAY_MS = 30;
  const HOLD_MS = 1600;
  const NEXT_QUERY_PAUSE_MS = 300;
  const HIGHLIGHTS_PER_PROJECT = 2;

  // Marquees loop seamlessly by rendering their items twice.
  const stackRowSplit = Math.ceil(skills.length / 2);
  const stackRows = [skills.slice(0, stackRowSplit), skills.slice(stackRowSplit)].map((row) => [...row, ...row]);
  const discoveryResults = projects.flatMap((project) =>
    project.highlights.slice(0, HIGHLIGHTS_PER_PROJECT).map((highlight) => ({ ...highlight, projectName: project.name, isDemo: project.isDemo })),
  );
  const marqueeResults = [...discoveryResults, ...discoveryResults];

  const ROW_CLASS = 'mb-10 grid grid-cols-2 items-center gap-12 max-[900px]:mb-[70px] max-[900px]:grid-cols-1 max-[900px]:gap-7';
  const CARD_CLASS = 'f-card group relative isolate h-[510px] overflow-hidden rounded-[32px] max-[900px]:h-[440px]';
  const HEADING_CLASS = 'pl-12 text-[clamp(28px,2.9vw,40px)] leading-[1.2] font-normal tracking-[-.01em] max-[1100px]:pl-0';
  const DIM_CLASS = 'text-[#c9ced6]';

  /** Typed text; until typing starts (no JS, reduced motion) the first query shows as-is. */
  let typedText = $state<string>();
  const searchText = $derived(typedText ?? localize(searchQueries[0]));

  /* The search box types through a few queries. */
  onMount(() => {
    if (prefersReducedMotion()) return;
    let isMounted = true;
    typedText = '';
    (async () => {
      for (let queryIndex = 0; isMounted; queryIndex = (queryIndex + 1) % searchQueries.length) {
        // Read lazily so a language restored after mount applies mid-query.
        const query = () => localize(searchQueries[queryIndex]);
        while (isMounted && typedText.length < query().length) {
          typedText = query().slice(0, typedText.length + 1);
          await wait(TYPE_DELAY_MS);
        }
        await wait(HOLD_MS);
        while (typedText) {
          typedText = typedText.slice(0, -1);
          await wait(ERASE_DELAY_MS);
        }
        await wait(NEXT_QUERY_PAUSE_MS);
      }
    })();
    return () => (isMounted = false);
  });
</script>

<section class="mx-auto max-w-[1440px] px-14 pt-[150px] pb-10 text-on-dark max-[1100px]:px-6 max-[1100px]:pt-[120px]" id="features" data-theme="dark">
  <h2 class="h2 mb-[90px] max-w-[22ch]" use:reveal>{t('feat.title')}</h2>

  <!-- 1. Stack marquee: two rows running in opposite directions -->
  <div class={ROW_CLASS} use:inView>
    <div class="{CARD_CLASS} grad-1">
      <div class="absolute inset-x-0 top-1/2 grid -translate-y-1/2 gap-4 overflow-hidden py-10">
        {#each stackRows as row, rowIndex (rowIndex)}
          <div class={['flex w-max animate-marquee group-hover:[animation-play-state:paused]', rowIndex % 2 && '[animation-direction:reverse]']}>
            {#each row as tech, index (index)}
              {@const icon = techIcons[tech]}
              <div
                class="mr-3.5 flex size-28 flex-none flex-col items-center justify-center gap-2.5 rounded-2xl bg-white p-2 text-center text-[13px] font-semibold text-ink shadow-[0_10px_28px_rgba(20,24,33,.12)]"
                aria-hidden={index >= row.length / 2}>
                <span
                  class="grid size-12 place-items-center rounded-xl bg-[var(--tile,#fff)] shadow-[0_1px_2px_rgba(35,38,45,.12)]"
                  style:--tile={icon.tile}><BrandIcon {icon} class="size-7" /></span>
                {tech}
              </div>
            {/each}
          </div>
        {/each}
      </div>
    </div>
    <div><h3 class={HEADING_CLASS}><Sweep text={t('f1.a')} /> <span class={DIM_CLASS}>{t('f1.b')}</span></h3></div>
  </div>

  <!-- 2. Searchable, fast features -->
  <div class={ROW_CLASS} use:inView>
    <div class="{CARD_CLASS} grad-2 order-2 max-[900px]:order-none">
      <div
        class="absolute top-[34px] left-1/2 z-2 flex h-[50px] w-[76%] -translate-x-1/2 items-center gap-2.5 rounded-full bg-white px-[18px] text-[15px] text-ink shadow-[0_10px_26px_rgba(20,24,33,.08)]"
      ><svg class="size-[18px] flex-none fill-none stroke-ink-2 stroke-2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/></svg><span>{searchText}</span><i class="ml-px inline-block h-[1.05em] w-[1.5px] animate-blink bg-current align-[-2px]"></i></div>
      <div class="absolute inset-x-[12%] top-[104px] bottom-0 overflow-hidden [mask-image:linear-gradient(transparent,#000_10%,#000_85%,transparent)]">
        <div class="grid animate-scroll-up gap-3">
          {#each marqueeResults as result, index (index)}
            <div class="grid grid-cols-[92px_1fr] items-center gap-3.5 rounded-2xl bg-white p-2.5 text-ink">
              <img class="h-[72px] w-[92px] rounded-[10px] object-cover" src={result.src} alt="" loading="lazy" />
              <div><b class="block text-[15px] font-medium">{localize(result.title)}</b><small class="my-[3px] block text-[12.5px] text-ink-2">{result.projectName}{#if result.isDemo} · {t('badge.demo')}{/if}</small><div class="text-[12.5px]">{localize(result.detail)}</div></div>
            </div>
          {/each}
        </div>
      </div>
    </div>
    <div><h3 class={HEADING_CLASS}><span class={DIM_CLASS}>{t('f2.a')}</span><br /><Sweep text={t('f2.b')} /></h3></div>
  </div>

  <!-- 3. Social links -->
  <div class={ROW_CLASS} use:inView>
    <div class="{CARD_CLASS} grad-3">
      <ul class="absolute inset-0 grid content-center gap-3.5 px-[8%]">
        {#each socials as social, index (social.url)}
          <li>
            <a
              class="group/social flex translate-y-4 items-center gap-3.5 rounded-[18px] bg-white px-[18px] py-3.5 text-ink no-underline opacity-0 shadow-[0_10px_28px_rgba(20,24,33,.12)] transition-[opacity,translate,box-shadow] duration-[.6s,.6s,.2s] ease-smooth hover:shadow-[0_16px_36px_rgba(20,24,33,.2)] focus-visible:outline-ink in-[.in-view]:translate-y-0 in-[.in-view]:opacity-100 in-[.in-view]:delay-[calc(var(--i)*120ms)]"
              style:--i={index}
              href={social.url} target={social.isExternal ? '_blank' : undefined} rel={social.isExternal ? 'noreferrer' : undefined}>
              <span class="grid size-12 flex-none place-items-center rounded-xl bg-soft"><BrandIcon icon={social.icon} class="size-[26px]" /></span>
              <span class="min-w-0 flex-1"><b class="block text-base font-semibold">{localize(social.label)}</b><small class="block truncate text-[13px] text-ink-2">{social.handle}</small></span>
              {#if social.isExternal}<span class="text-lg text-ink-2 transition-[translate] duration-200 group-hover/social:translate-x-0.5 group-hover/social:-translate-y-0.5" aria-hidden="true">↗</span><span class="sr-only">({t('social.newTab')})</span>{/if}
            </a>
          </li>
        {/each}
      </ul>
    </div>
    <div><h3 class={HEADING_CLASS}><Sweep text={t('f3.a')} /> <span class={DIM_CLASS}>{t('f3.b')}</span></h3></div>
  </div>
</section>
