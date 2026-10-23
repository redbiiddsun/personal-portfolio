<script lang="ts">
  import { localize, t, type DictKey } from '#lib/i18n.svelte.ts';
  import type { GalleryBadge, Highlight, Project, ProjectTab } from '#lib/types.ts';

  let { project, tab = $bindable('gallery') }: { project: Project; tab?: ProjectTab } = $props();

  const TABS: { id: ProjectTab; labelKey: DictKey }[] = [
    { id: 'gallery', labelKey: 'tab.gallery' },
    { id: 'highlights', labelKey: 'tab.highlights' },
    { id: 'details', labelKey: 'tab.details' },
  ];
  const BADGE_KEYS: Record<GalleryBadge, DictKey> = { live: 'badge.live', demo: 'badge.demo', appStore: 'badge.appStore' };
  const TYPE_BANNER_LINES = 5;
</script>

<!-- `isStacked`: image above the text (Highlights tab grid) instead of beside it (gallery sidebar). -->
{#snippet highlightCard(highlight: Highlight, isStacked: boolean)}
  <div
    class={[
      'mb-3 grid items-center gap-3.5 rounded-2xl border border-line p-2.5 transition-[box-shadow,translate] duration-300 ease-smooth hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(20,24,33,.08)]',
      isStacked ? 'grid-cols-1' : 'grid-cols-[130px_1fr]',
    ]}
  >
    <img
      class={['rounded-[10px] object-cover', isStacked ? 'h-[150px] w-full' : 'h-24 w-[130px]']}
      src={highlight.src}
      alt=""
      loading="lazy"
    />
    <div class="min-w-0">
      <h5 class="mb-1.5 truncate text-[17px] font-medium">{localize(highlight.title)}</h5>
      <div class="text-[15px] text-ink">{localize(highlight.detail)}</div>
    </div>
  </div>
{/snippet}

<div class="mb-3.5 text-[15px] text-ink-2">{t(project.isDemo ? 'project.demo' : 'project.client')}{#if project.year} · {project.year}{/if}</div>
<div class="grid grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-8 max-[900px]:grid-cols-1 max-[900px]:gap-4">
  <div class="grid grid-cols-[78px_1fr] items-start gap-[18px] max-[900px]:grid-cols-[56px_1fr] max-[900px]:gap-3">
    <img class="size-[78px] rounded-full object-cover max-[900px]:size-14" src={project.logo} alt="" />
    <div class="min-w-0">
      <h3 class="mt-0.5 mb-2 text-[28px] font-medium tracking-[-.01em] max-[900px]:text-[22px]">{project.name}</h3>
      <div class="flex flex-wrap items-center gap-1.5 text-[12.5px] text-ink-2">
        {#if project.url}<a class="text-ink" href={project.url} target="_blank" rel="noreferrer">{new URL(project.url).host}</a> · {/if}{localize(project.myRole)}
      </div>
      <p class="mt-3 mb-3.5 text-[13.5px] leading-[1.55] text-ink-2">{localize(project.summary)}</p>
      <div
        class="inline-grid grid-flow-col gap-1 rounded-xl border border-line px-3 py-2.5 max-[900px]:grid max-[900px]:w-full max-[900px]:grid-cols-4 max-[900px]:px-1 max-[900px]:py-2"
      >
        {#each project.stats as stat, statIndex (statIndex)}<span class="min-w-[68px] text-center text-[10px] text-ink-2 max-[900px]:min-w-0"
            ><b class="block text-[15px] font-medium text-ink">{localize(stat.value)}</b>{localize(stat.label)}</span
          >{/each}
      </div>
    </div>
  </div>
  <div>
    <div class="relative h-[150px] overflow-hidden rounded-[14px] max-[900px]:h-[110px]">
      {#if project.banner.type === 'type'}
        <div class="grid size-full place-items-center overflow-hidden bg-[linear-gradient(180deg,#d20a0a,#6b0d4f)]">
          <div
            class="animate-drift text-[34px] leading-[.82] font-extrabold tracking-[-.02em] whitespace-nowrap text-transparent uppercase [-webkit-text-stroke:1px_#ff3b3b]"
          >
            {#each { length: TYPE_BANNER_LINES }, line (line)}{#if line}<br />{/if}{project.banner.text}
              <b class="text-[#ff2a2a] [-webkit-text-stroke:0]">{project.banner.emphasis}</b>{/each}
          </div>
        </div>
      {:else if project.banner.type === 'gradient'}
        <div
          class="grid size-full place-items-center bg-[repeating-linear-gradient(90deg,#fff4ee_0_14px,#ffd0b5_22px,#ff7a3d_34px,#ffd7c2_44px,#fff4ee_58px)]"
        >
          <span class="text-[34px] font-semibold text-white [text-shadow:0_2px_20px_rgba(214,62,0,.45)]">{project.banner.label}</span>
        </div>
      {:else}
        <img class="size-full object-cover" src={project.banner.src} alt="" />
      {/if}
    </div>
    <div class="mt-2.5 flex flex-wrap items-center gap-1.5">
      {#each project.stack as tech (tech)}<span class="rounded-full border border-line bg-white px-2.5 py-1.5 text-[11px]">{tech}</span>{/each}{#if project.year}<span
          class="ml-auto text-[11px] text-ink-2">◷ {project.year}</span
        >{/if}
    </div>
  </div>
</div>
<div class="mt-[22px] mb-3.5 flex gap-[34px] border-b border-line max-[900px]:gap-5">
  {#each TABS as { id, labelKey } (id)}
    <button
      class={[
        'relative py-2.5 text-base',
        id === tab
          ? "font-medium text-ink after:absolute after:inset-x-0 after:-bottom-px after:h-[3px] after:rounded-[3px] after:bg-ink after:content-['']"
          : 'text-ink-2',
      ]}
      type="button"
      aria-pressed={id === tab}
      onclick={() => (tab = id)}>{t(labelKey)}</button
    >
  {/each}
</div>
{#key `${project.id}:${tab}`}
  <div class="animate-fade-up">
    {#if tab === 'highlights'}
      <div class="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3">
        {#each project.highlights as highlight (highlight.src)}{@render highlightCard(highlight, true)}{/each}
      </div>
    {:else if tab === 'details'}
      <div class="max-w-[640px] leading-[1.7] text-ink-2">
        <p class="my-4">{localize(project.description)}</p>
        <dl class="mt-[18px] mb-4 grid grid-cols-[140px_1fr] gap-2.5 [&_dd]:text-ink [&_dt]:text-ink-3">
          <dt>{t('project.role')}</dt><dd>{localize(project.myRole)}</dd>
          {#if project.stack.length}<dt>{t('project.stack')}</dt><dd>{project.stack.join(' · ')}</dd>{/if}
          {#if project.year}<dt>{t('project.year')}</dt><dd>{project.year}</dd>{/if}
        </dl>
      </div>
    {:else}
      <div class="grid grid-cols-[minmax(0,1fr)_360px] gap-[34px] max-[1100px]:grid-cols-1">
        <div class="columns-3 gap-x-3 max-[900px]:columns-2">
          {#each project.gallery as tile, tileIndex (tileIndex)}
            <div class="group relative mb-3 break-inside-avoid overflow-hidden rounded-[14px] bg-soft">
              <img
                class="h-(--th) w-full object-cover transition-[scale] duration-600 ease-smooth group-hover:scale-104"
                src={tile.src}
                alt=""
                style="--th:{tile.height}px"
                loading="lazy"
              />
              {#if tile.badge}<span class="absolute bottom-2.5 left-2.5 rounded-full bg-white/92 px-[11px] py-[5px] text-[13px] font-medium">{t(BADGE_KEYS[tile.badge])}</span>{/if}
            </div>
          {/each}
        </div>
        <div class="max-[1100px]:hidden">
          <div class="mb-3 flex items-baseline justify-between text-[17px] font-medium">
            {t('tab.highlights')} <button class="px-1.5 py-px text-[15px]" type="button" onclick={() => (tab = 'highlights')}>{t('project.viewAll')}</button>
          </div>
          {#each project.highlights as highlight (highlight.src)}{@render highlightCard(highlight, false)}{/each}
        </div>
      </div>
    {/if}
  </div>
{/key}
