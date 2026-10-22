<script lang="ts">
  import { OWNER, avatar, bannerImage, galleryImage, highlightImage, img, logoImage, testimonials } from '#lib/data.ts';
  import type { Highlight, Project, ProjectTab } from '#lib/types.ts';

  let {
    project,
    projectIndex,
    tab = $bindable('gallery'),
  }: {
    project: Project;
    /** Offsets which testimonials from the shared pool this project shows. */
    projectIndex: number;
    tab?: ProjectTab;
  } = $props();

  const TABS: { id: ProjectTab; label: string }[] = [
    { id: 'gallery', label: 'Gallery' },
    { id: 'highlights', label: 'Highlights' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'details', label: 'Details' },
  ];
  const TESTIMONIALS_SHOWN = 3;
  const TYPE_BANNER_LINES = 5;

  const feedback = $derived(
    Array.from(
      { length: TESTIMONIALS_SHOWN },
      (_, offset) => testimonials[(projectIndex + offset) % testimonials.length],
    ),
  );
</script>

{#snippet highlightCard(highlight: Highlight)}
  <div class="svc">
    <img src={highlightImage(highlight)} alt="" loading="lazy" />
    <div style="min-width:0">
      <h5>{highlight.title}</h5>
      <div class="meta">{highlight.detail}</div>
    </div>
  </div>
{/snippet}

<div class="p-kicker">Project · {project.year}</div>
<div class="p-top">
  <div class="p-id">
    <div class="p-av"><img src={logoImage(project.logoSeed)} alt="" /></div>
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
      <div class="p-banner"><img src={bannerImage(project.banner.seed)} alt="" /></div>
    {/if}
    <div class="p-tags">
      {#each project.stack as tech (tech)}<span class="chip">{tech}</span>{/each}<span class="p-loc">◷ {project.year}</span>
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
    {:else if tab === 'feedback'}
      {#each feedback as quote (quote.name)}
        <div class="rv">
          <img src={avatar(quote.avatarId)} alt="" />
          <div><b>{quote.name}</b><small>{quote.title}</small><div class="stars">★★★★★</div><p>“{quote.text}”</p></div>
        </div>
      {/each}
    {:else if tab === 'details'}
      <div class="about">
        <p>{project.description}</p>
        <dl>
          <dt>My role</dt><dd>{project.myRole}</dd>
          <dt>Stack</dt><dd>{project.stack.join(' · ')}</dd>
          <dt>Year</dt><dd>{project.year}</dd>
          <dt>Built by</dt><dd>{OWNER.name}</dd>
        </dl>
      </div>
    {:else}
      <div class="p-port">
        <div class="masonry">
          {#each project.gallery as tile, tileIndex (tileIndex)}
            {#if tile.caseStudy}
              <div class="tile tile-article">
                <img src={img(tile.caseStudy.seed, 400, 200)} alt="" style="--th:90px" />
                <div class="by"><img src={logoImage(project.logoSeed)} alt="" />{OWNER.nickname}</div>
                <small>◷ {tile.caseStudy.readMinutes} min read</small>
                <h4>{tile.caseStudy.title}</h4>
                <p>{tile.caseStudy.excerpt}</p>
              </div>
            {:else if tile.seed && tile.height}
              <div class="tile">
                <img src={galleryImage(tile.seed, tile.height)} alt="" style="--th:{tile.height}px" loading="lazy" />
                {#if tile.badge}<span class="price">{tile.badge}</span>{/if}
              </div>
            {/if}
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
