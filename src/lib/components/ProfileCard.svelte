<script lang="ts">
  import { avatar, bannerImage, img, portfolioImage, reviewsPool, serviceImage } from '#lib/data.ts';
  import type { ProfileTab, Role, Service } from '#lib/types.ts';

  let {
    role,
    roleIndex,
    tab = $bindable('portfolio'),
    isPlaying,
    onToggleAudio,
  }: {
    role: Role;
    /** Offsets which reviews from the shared pool this profile shows. */
    roleIndex: number;
    tab?: ProfileTab;
    isPlaying: boolean;
    onToggleAudio: () => void;
  } = $props();

  const TABS: ProfileTab[] = ['portfolio', 'services', 'reviews', 'about'];
  const REVIEWS_SHOWN = 3;
  const COMPOSER_BANNER_LINES = 5;

  const capitalize = (word: string) => word[0].toUpperCase() + word.slice(1);
  const reviews = $derived(
    Array.from({ length: REVIEWS_SHOWN }, (_, offset) => reviewsPool[(roleIndex + offset) % reviewsPool.length]),
  );
</script>

{#snippet serviceCard(service: Service)}
  <div class="svc">
    <img src={serviceImage(service)} alt="" loading="lazy" />
    <div style="min-width:0">
      <h5>{service.title}</h5>
      <div class="meta">{service.price} <em>· Sold {service.soldCount}</em></div>
      <div class="rate">★ {service.rating.toFixed(1)} ({service.ratingCount})</div>
    </div>
  </div>
{/snippet}

<div class="p-kicker">{role.name}’s Profile</div>
<div class="p-top">
  <div class="p-id">
    <div class="p-av"><img src={avatar(role.avatarId)} alt="" /><i></i></div>
    <div>
      <h3 class="p-name">{role.name}</h3>
      <!-- svelte-ignore a11y_invalid_attribute -->
      <div class="p-handle"><a href="#">@{role.handle}</a> · <span class="claim">CLAIM</span> · {role.followers} followers</div>
      <p class="p-bio">{role.bio}</p>
      <div class="p-stats">
        <span><b>{role.stats.earned}</b>Earned</span><span><b>{role.stats.orders}</b>Orders</span>
        <span><b>{role.stats.rehires}</b>Rehires</span><span><b>★{role.stats.rating}</b>Ratings</span>
      </div>
    </div>
  </div>
  <div>
    {#if role.banner.type === 'composer'}
      <div class="p-banner banner-composer">
        <div class="stack-txt">
          {#each { length: COMPOSER_BANNER_LINES }, line (line)}{#if line}<br />{/if}MUSIC <b>COMPOSER</b>{/each}
        </div>
      </div>
    {:else if role.banner.type === 'ai'}
      <div class="p-banner banner-ai"><span>AI automation</span></div>
    {:else}
      <div class="p-banner"><img src={bannerImage(role.banner.seed)} alt="" /></div>
    {/if}
    <div class="p-tags">
      {#each role.tags as tag (tag)}<span class="chip">{tag}</span>{/each}<span class="p-loc">⌖ {role.city}</span>
    </div>
  </div>
</div>
<div class="p-tabs" role="tablist">
  {#each TABS as tabName (tabName)}
    <button role="tab" aria-selected={tabName === tab} onclick={() => (tab = tabName)}>{capitalize(tabName)}</button>
  {/each}
</div>
{#key `${role.id}:${tab}`}
  <div class="p-body">
    {#if tab === 'services'}
      <div class="svc-grid">{#each role.services as service (service.title)}{@render serviceCard(service)}{/each}</div>
    {:else if tab === 'reviews'}
      {#each reviews as review (review.name)}
        <div class="rv">
          <img src={avatar(review.avatarId)} alt="" />
          <div><b>{review.name}</b><small>{review.postedAgo}</small><div class="stars">★★★★★</div><p>“{review.text}”</p></div>
        </div>
      {/each}
    {:else if tab === 'about'}
      <div class="about">
        <p>{role.bio} Based in {role.city}. Available for new projects and long-term retainers.</p>
        <dl>
          <dt>Skills</dt><dd>{role.skills.join(' · ')}</dd>
          <dt>Languages</dt><dd>Thai, English</dd>
          <dt>Response time</dt><dd>Within 1 hour</dd>
          <dt>Member since</dt><dd>2019</dd>
        </dl>
      </div>
    {:else}
      <div class="p-port">
        <div class="masonry">
          {#each role.portfolio as tile, tileIndex (tileIndex)}
            {#if tile.isVinyl}
              <div class="tile tile-vinyl" class:playing={isPlaying}>
                <div class="vinyl"><div class="label"></div></div>
                <button class="mute" aria-label={isPlaying ? 'Mute sample' : 'Play sample'} onclick={onToggleAudio}>
                  {#if isPlaying}
                    <svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"/></svg>
                  {:else}
                    <svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="m17 9 5 6M22 9l-5 6"/></svg>
                  {/if}
                </button>
              </div>
            {:else if tile.article}
              <div class="tile tile-article">
                <img src={img(tile.article.seed, 400, 200)} alt="" style="--th:90px" />
                <div class="by"><img src={avatar(role.avatarId)} alt="" />{role.name}</div>
                <small>◷ {tile.article.readMinutes} min read</small>
                <h4>{tile.article.title}</h4>
                <p>{tile.article.excerpt}</p>
              </div>
            {:else if tile.seed && tile.height}
              <div class="tile">
                <img src={portfolioImage(tile.seed, tile.height)} alt="" style="--th:{tile.height}px" loading="lazy" />
                {#if tile.price}<span class="price">{tile.price}</span>{/if}
              </div>
            {/if}
          {/each}
        </div>
        <div class="svc-col">
          <div class="svc-head">Services <button onclick={() => (tab = 'services')}>View all</button></div>
          {#each role.services as service (service.title)}{@render serviceCard(service)}{/each}
        </div>
      </div>
    {/if}
  </div>
{/key}
