<!-- One project: a large screenshot up top, a short summary below; the full story opens in place of the image. -->
<script lang="ts">
  import { localize, t } from '#lib/i18n.svelte.ts';
  import type { Project } from '#lib/types.ts';

  let { project }: { project: Project } = $props();

  let imageIndex = $state(0);
  let isDetailsOpen = $state(false);
</script>

<!-- The showcase pins the card at screen height, so open details scroll inside the media area rather than growing the card. -->
<div class="flex h-full flex-col gap-5 max-[900px]:gap-4">
  <div class={['relative min-h-0 flex-1 overflow-hidden rounded-[20px] bg-soft', !isDetailsOpen && 'max-[900px]:aspect-[16/10] max-[900px]:flex-none']}>
    {#if isDetailsOpen}
      <div
        class="absolute inset-0 animate-fade-up overflow-y-auto bg-white p-7 leading-[1.6] max-[900px]:p-4"
        id="project-details-{project.id}"
      >
        <p class="mb-6 max-w-[62ch] text-[15px] text-ink-2">{localize(project.description)}</p>
        <div class="mb-6 grid grid-cols-4 gap-2 max-[900px]:grid-cols-2">
          {#each project.stats as stat, statIndex (statIndex)}
            <div class="rounded-xl bg-soft px-3 py-2.5">
              <b class="block text-lg font-medium">{localize(stat.value)}</b>
              <span class="text-xs text-ink-2">{localize(stat.label)}</span>
            </div>
          {/each}
        </div>
        <h4 class="mb-3 text-sm font-semibold tracking-[.04em] text-ink-3 uppercase">{t('project.highlights')}</h4>
        <ul class="mb-6 grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3">
          {#each project.highlights as highlight (highlight.src)}
            <li class="grid grid-cols-[88px_1fr] items-center gap-3 rounded-2xl border border-line p-2">
              <img class="h-16 w-[88px] rounded-[10px] object-cover" src={highlight.src} alt="" loading="lazy" />
              <div class="min-w-0">
                <b class="block truncate text-[15px] font-medium">{localize(highlight.title)}</b>
                <span class="text-[13px] text-ink-2">{localize(highlight.detail)}</span>
              </div>
            </li>
          {/each}
        </ul>
        <dl class="grid grid-cols-[120px_1fr] gap-2 text-sm [&_dd]:text-ink [&_dt]:text-ink-3">
          <dt>{t('project.role')}</dt><dd>{localize(project.myRole)}</dd>
          <dt>{t('project.stack')}</dt><dd>{project.stack.join(' · ')}</dd>
          {#if project.year}<dt>{t('project.year')}</dt><dd>{project.year}</dd>{/if}
        </dl>
      </div>
    {:else}
      <!-- Blurred copy fills the frame, so tall phone screens and wide web pages both fit without cropping. -->
      {#key imageIndex}
        <img class="absolute inset-0 size-full scale-110 object-cover opacity-60 blur-2xl" src={project.gallery[imageIndex]} alt="" aria-hidden="true" />
        <img class="relative size-full animate-fade-up object-contain" src={project.gallery[imageIndex]} alt="" />
      {/key}
      {#if project.gallery.length > 1}
        <div class="absolute bottom-3 left-3 flex rounded-full bg-white/85 backdrop-blur" role="group" aria-label={project.name}>
          {#each project.gallery as src, index (src)}
            <button
              class="group grid size-6 place-items-center"
              type="button"
              aria-label={t('project.screenshot').replace('{n}', String(index + 1)).replace('{total}', String(project.gallery.length))}
              aria-pressed={index === imageIndex}
              onclick={() => (imageIndex = index)}
            >
              <span class={['size-2.5 rounded-full transition-[background-color,scale] duration-200', index === imageIndex ? 'scale-125 bg-ink' : 'bg-ink-3/50 group-hover:bg-ink-3']}></span>
            </button>
          {/each}
        </div>
      {/if}
    {/if}
  </div>

  <div class="flex items-start gap-4 px-1">
    <img class="size-12 flex-none rounded-full object-cover" src={project.logo} alt="" />
    <div class="min-w-0 flex-1">
      <div class="flex flex-wrap items-center gap-2">
        <h3 class="text-[26px] leading-tight font-medium tracking-[-.01em] max-[900px]:text-[21px]">{project.name}</h3>
        <span class={['rounded-full px-2.5 py-0.5 text-xs font-semibold', project.isDemo ? 'bg-warn-bg text-warn' : 'bg-ok-bg text-ok']}>
          {t(project.isDemo ? 'badge.demo' : 'badge.live')}
        </span>
      </div>
      <p class="mt-0.5 text-sm text-ink-3">{localize(project.label)}{#if project.year} · {project.year}{/if}</p>
      <p class="mt-2 line-clamp-2 max-w-[70ch] text-[15px] leading-[1.55] text-ink-2">{localize(project.summary)}</p>
    </div>
  </div>

  <div class="flex flex-wrap items-center gap-2 px-1">
    {#each project.stack as tech (tech)}<span class="rounded-full border border-line px-2.5 py-1 text-xs">{tech}</span>{/each}
    <span class="ml-auto flex items-center gap-2 max-[900px]:ml-0 max-[900px]:w-full">
      {#if project.url}
        <a class="rounded-full px-3.5 py-2 text-sm font-medium text-ink-2 hover:text-ink" href={project.url} target="_blank" rel="noreferrer">{t('project.visit')} <span aria-hidden="true">↗</span></a>
      {/if}
      <button
        class="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition-[background-color] duration-200 hover:bg-dark"
        type="button"
        aria-expanded={isDetailsOpen}
        aria-controls="project-details-{project.id}"
        onclick={() => (isDetailsOpen = !isDetailsOpen)}
      >
        {#if isDetailsOpen}<span aria-hidden="true">←</span> {t('project.less')}{:else}{t('project.more')} <span aria-hidden="true">→</span>{/if}
      </button>
    </span>
  </div>
</div>
