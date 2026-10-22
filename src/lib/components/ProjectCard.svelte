<script lang="ts">
  import type { Highlight, Project, ProjectTab } from '#lib/types.ts';

  let { project, tab = $bindable('gallery') }: { project: Project; tab?: ProjectTab } = $props();

  const TABS: { id: ProjectTab; label: string }[] = [
    { id: 'gallery', label: 'Gallery' },
    { id: 'highlights', label: 'Highlights' },
    { id: 'details', label: 'Details' },
  ];
  const TYPE_BANNER_LINES = 5;
</script>

{#snippet highlightCard(highlight: Highlight)}
  <div class="svc">
    <img src={highlight.src} alt="" loading="lazy" />
    <div style="min-width:0">
      <h5>{highlight.title}</h5>
      <div class="meta">{highlight.detail}</div>
    </div>
  </div>
{/snippet}

<div class="p-kicker">{project.isDemo ? 'Demo project' : 'Project'}{#if project.year} · {project.year}{/if}</div>
<div class="p-top">
  <div class="p-id">
    <div class="p-av"><img src={project.logo} alt="" /></div>
    <div>
      <h3 class="p-name">{project.name}</h3>
      <div class="p-handle">
        {#if project.url}<a href={project.url} target="_blank" rel="noreferrer">{new URL(project.url).host}</a> · {/if}{project.myRole}
      </div>
      <p class="p-bio">{project.summary}</p>
      <div class="p-stats">
        {#each project.stats as stat (stat.label)}<span><b>{stat.value}</b>{stat.label}</span>{/each}
      </div>
    </div>
  </div>
  <div>
    {#if project.banner.type === 'type'}
      <div class="p-banner banner-composer">
        <div class="stack-txt">
          {#each { length: TYPE_BANNER_LINES }, line (line)}{#if line}<br />{/if}{project.banner.text} <b>{project.banner.emphasis}</b>{/each}
        </div>
      </div>
    {:else if project.banner.type === 'gradient'}
      <div class="p-banner banner-ai"><span>{project.banner.label}</span></div>
    {:else}
      <div class="p-banner"><img src={project.banner.src} alt="" /></div>
    {/if}
    <div class="p-tags">
      {#each project.stack as tech (tech)}<span class="chip">{tech}</span>{/each}{#if project.year}<span class="p-loc">◷ {project.year}</span>{/if}
    </div>
  </div>
</div>
<div class="p-tabs" role="tablist">
  {#each TABS as { id, label } (id)}
    <button role="tab" aria-selected={id === tab} onclick={() => (tab = id)}>{label}</button>
  {/each}
</div>
{#key `${project.id}:${tab}`}
  <div class="p-body">
    {#if tab === 'highlights'}
      <div class="svc-grid">{#each project.highlights as highlight (highlight.title)}{@render highlightCard(highlight)}{/each}</div>
    {:else if tab === 'details'}
      <div class="about">
        <p>{project.description}</p>
        <dl>
          <dt>My role</dt><dd>{project.myRole}</dd>
          {#if project.stack.length}<dt>Stack</dt><dd>{project.stack.join(' · ')}</dd>{/if}
          {#if project.year}<dt>Year</dt><dd>{project.year}</dd>{/if}
        </dl>
      </div>
    {:else}
      <div class="p-port">
        <div class="masonry">
          {#each project.gallery as tile, tileIndex (tileIndex)}
            <div class="tile">
              <img src={tile.src} alt="" style="--th:{tile.height}px" loading="lazy" />
              {#if tile.badge}<span class="price">{tile.badge}</span>{/if}
            </div>
          {/each}
        </div>
        <div class="svc-col">
          <div class="svc-head">Highlights <button onclick={() => (tab = 'highlights')}>View all</button></div>
          {#each project.highlights as highlight (highlight.title)}{@render highlightCard(highlight)}{/each}
        </div>
      </div>
    {/if}
  </div>
{/key}
