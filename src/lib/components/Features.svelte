<script lang="ts">
  import { onMount } from 'svelte';
  import { inView, reveal } from '#lib/actions.ts';
  import { OWNER, avatar, img, projects, testimonials } from '#lib/data.ts';
  import { t } from '#lib/i18n.svelte.ts';
  import { prefersReducedMotion, wait } from '#lib/utils.ts';
  import Sweep from './Sweep.svelte';

  const SEARCH_QUERIES = ['realtime dashboard', 'stripe checkout', 'AI chatbot', 'REST API', 'booking app'];
  const TYPE_DELAY_MS = 70;
  const ERASE_DELAY_MS = 30;
  const HOLD_MS = 1600;
  const NEXT_QUERY_PAUSE_MS = 300;
  const HIGHLIGHTS_PER_PROJECT = 2;
  const PROFILE_AVATAR_PX = 120;
  /** PLACEHOLDER: swap for your own photo. */
  const PROFILE_PHOTO = avatar(36, PROFILE_AVATAR_PX);
  const technologyCount = new Set(projects.flatMap((project) => project.stack)).size;
  const FLAGS = ['🇰🇷', '🇺🇸', '🇹🇭', '🇯🇵', '🇪🇺', '🇬🇧'];

  // Marquees loop seamlessly by rendering their items twice.
  const marqueeTestimonials = [...testimonials, ...testimonials];
  const discoveryResults = projects.flatMap((project) =>
    project.highlights.slice(0, HIGHLIGHTS_PER_PROJECT).map((highlight) => ({ ...highlight, projectName: project.name })),
  );
  const marqueeResults = [...discoveryResults, ...discoveryResults];

  let searchText = $state('');

  /* The search box types through a few queries. */
  onMount(() => {
    if (prefersReducedMotion()) {
      searchText = SEARCH_QUERIES[0];
      return;
    }
    let isMounted = true;
    (async () => {
      for (let queryIndex = 0; isMounted; queryIndex = (queryIndex + 1) % SEARCH_QUERIES.length) {
        for (const character of SEARCH_QUERIES[queryIndex]) {
          searchText += character;
          await wait(TYPE_DELAY_MS);
        }
        await wait(HOLD_MS);
        while (searchText) {
          searchText = searchText.slice(0, -1);
          await wait(ERASE_DELAY_MS);
        }
        await wait(NEXT_QUERY_PAUSE_MS);
      }
    })();
    return () => (isMounted = false);
  });
</script>

<section class="features" id="features" data-theme="dark">
  <h2 class="h2" use:reveal>{t('feat.title')}</h2>

  <!-- 1. Products + client feedback -->
  <div class="f-row" use:inView>
    <div class="f-card grad-1">
      <div class="mini-profile">
        <div class="mp-head"><img src={PROFILE_PHOTO} alt="" /><div><b>{OWNER.nickname}</b><small>{OWNER.name} · {OWNER.title}</small></div></div>
        <p>Web apps end to end, from database to pixel.</p>
        <!-- PLACEHOLDER: set your real reply time and availability. -->
        <small class="mp-loc">● Booking from Nov 2026</small>
        <div class="mp-gap"></div>
        <div class="mp-stats"><span><b>{projects.length}</b>Projects</span><span><b>{technologyCount}</b>Technologies</span><span><b>EN/TH</b>Languages</span><span><b>&lt;24h</b>Replies</span></div>
        <div class="mp-shots"><img src={img('dashboard-ui', 300, 220)} alt="" /><img src={img('shop-mock', 300, 220)} alt="" /></div>
      </div>
      <div class="rev-marquee">
        <div class="rev-track">
          {#each marqueeTestimonials as quote, index (index)}
            <div class="rev-card"><div class="s">5.0</div><p>“{quote.text}”</p><div class="who"><img src={avatar(quote.avatarId)} alt="" />{quote.name}</div></div>
          {/each}
        </div>
      </div>
    </div>
    <div class="f-text"><h3><Sweep text={t('f1.a')} /> <span class="dim">{t('f1.b')}</span></h3></div>
  </div>

  <!-- 2. Searchable, fast features -->
  <div class="f-row rev" use:inView>
    <div class="f-card grad-2">
      <div class="search-mock"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/></svg><span>{searchText}</span><i class="caret"></i></div>
      <div class="disc-window">
        <div class="disc-track">
          {#each marqueeResults as result, index (index)}
            <div class="disc-item">
              <img src={img(result.seed, 200, 160)} alt="" loading="lazy" />
              <div><b>{result.title}</b><small>{result.projectName}</small><div class="r">{result.detail}</div></div>
            </div>
          {/each}
        </div>
      </div>
    </div>
    <div class="f-text"><h3><span class="dim">{t('f2.a')}</span><br /><Sweep text={t('f2.b')} /></h3></div>
  </div>

  <!-- 3. Payments & auth -->
  <div class="f-row" use:inView>
    <div class="f-card grad-3">
      <div class="secure">
        <div class="rings"><i></i><i></i><i></i><i></i></div>
        <img class="party left" src={avatar(11)} alt="" />
        <img class="party right" src={avatar(20)} alt="" />
        <svg class="links" viewBox="0 0 600 120" preserveAspectRatio="none" aria-hidden="true"><path d="M90 60H240M360 60H510" /></svg>
        <span class="coin" aria-hidden="true">฿</span>
        <div class="shield">
          <svg viewBox="0 0 120 140" aria-hidden="true"><defs><linearGradient id="sh" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#e9f0ff"/><stop offset="1" stop-color="#9fbcff"/></linearGradient></defs><path d="M60 6 110 24v38c0 34-22 58-50 72C32 120 10 96 10 62V24Z" fill="url(#sh)" stroke="#3d63c9" stroke-width="7"/><path d="M60 6v128c28-14 50-38 50-72V24Z" fill="#fff" opacity=".85"/></svg>
          <svg class="shield-mark" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5c.6 4.6 2.9 6.9 7.5 7.5-4.6.6-6.9 2.9-7.5 7.5-.6-4.6-2.9-6.9-7.5-7.5 4.6-.6 6.9-2.9 7.5-7.5Z"/></svg>
        </div>
        <div class="flags" aria-hidden="true">{#each FLAGS as flag (flag)}<span>{flag}</span>{/each}</div>
      </div>
    </div>
    <div class="f-text"><h3><Sweep text={t('f3.a')} /> <span class="dim">{t('f3.b')}</span></h3></div>
  </div>

  <!-- 4. Admin tools -->
  <div class="f-row rev" use:inView>
    <div class="f-card grad-4">
      <!-- PLACEHOLDER: demo admin data, not real orders. -->
      <div class="orders">
        <div class="order"><div><b>Order #1042 · Mercado Shop</b><small>Ceramic mug set ×2 · 20 Jul 2026</small></div><div class="o-r"><b>฿1,250</b><span><i class="dot amber"></i><em class="tag amber">Held</em><em class="tag blue">New</em></span></div></div>
        <div class="order"><div><b>Order #1043 · Mercado Shop</b><small>Linen tote bag · 21 Jul 2026</small></div><div class="o-r"><b>฿690</b><span><i class="dot green"></i><em class="tag green">Paid</em><em class="tag amber">In progress</em></span></div></div>
        <div class="order"><div><b>Order #1044 · Mercado Shop</b><small>Desk lamp · 24 Jul 2026</small></div><div class="o-r"><b>฿2,100</b><span><em class="tag gray">Unpaid</em><em class="tag blue">New</em></span></div></div>
        <div class="order"><div><b>Order #1045 · Mercado Shop</b><small>Notebook bundle ×3 · 28 Jul 2026</small></div><div class="o-r"><b>฿450</b><span><em class="tag blue">Delivered</em></span></div></div>
      </div>
      <div class="quote">
        <b>Invoice</b><small>Due: 21 Aug 2026</small>
        <div class="q-amt">฿4,490</div>
        <b>Mercado Shop · monthly</b>
        <div class="q-doc"><i></i><i></i><i></i><i></i></div>
      </div>
    </div>
    <div class="f-text"><h3><span class="dim">{t('f4.a')}</span><br /><Sweep text={t('f4.b')} /></h3></div>
  </div>
</section>
