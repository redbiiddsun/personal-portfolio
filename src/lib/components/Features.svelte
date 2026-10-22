<script lang="ts">
  import { onMount } from 'svelte';
  import { inView, reveal } from '#lib/actions.ts';
  import { avatar, img, reviewsPool, roles } from '#lib/data.ts';
  import { t } from '#lib/i18n.svelte.ts';
  import { prefersReducedMotion, wait } from '#lib/utils.ts';
  import Sweep from './Sweep.svelte';

  const SEARCH_QUERIES = ['brand identity', 'wedding photographer', 'AI chatbot', 'sales page', 'film score'];
  const TYPE_DELAY_MS = 70;
  const ERASE_DELAY_MS = 30;
  const HOLD_MS = 1600;
  const NEXT_QUERY_PAUSE_MS = 300;
  const SERVICES_PER_ROLE = 2;
  const PROFILE_AVATAR_PX = 120;
  const FLAGS = ['🇰🇷', '🇺🇸', '🇹🇭', '🇯🇵', '🇪🇺', '🇬🇧'];

  // Marquees loop seamlessly by rendering their items twice.
  const marqueeReviews = [...reviewsPool, ...reviewsPool];
  const discoveryResults = roles.flatMap((role) =>
    role.services.slice(0, SERVICES_PER_ROLE).map((service) => ({ ...service, provider: role.name })),
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

  <!-- 1. Portfolio + reviews -->
  <div class="f-row" use:inView>
    <div class="f-card grad-1">
      <div class="mini-profile">
        <div class="mp-head"><img src={avatar(36, PROFILE_AVATAR_PX)} alt="" /><div><b>mira.studio</b><small>@mirastudio · 5 followers</small></div></div>
        <p>Interior designer crafting meaningful spaces</p>
        <small class="mp-loc">● Bangkok, Thailand</small>
        <div class="mp-gap"></div>
        <div class="mp-stats"><span><b>฿240K</b>Earned</span><span><b>43</b>Orders</span><span><b>5</b>Rehires</span><span><b>★ 48</b>Ratings</span></div>
        <div class="mp-shots"><img src={img('office-loft', 300, 220)} alt="" /><img src={img('yellow-cat', 300, 220)} alt="" /></div>
      </div>
      <div class="rev-marquee">
        <div class="rev-track">
          {#each marqueeReviews as review, index (index)}
            <div class="rev-card"><div class="s">5.0</div><p>“{review.text}”</p><div class="who"><img src={avatar(review.avatarId)} alt="" />{review.name}</div></div>
          {/each}
        </div>
      </div>
    </div>
    <div class="f-text"><h3><Sweep text={t('f1.a')} /> <span class="dim">{t('f1.b')}</span></h3></div>
  </div>

  <!-- 2. Discovery -->
  <div class="f-row rev" use:inView>
    <div class="f-card grad-2">
      <div class="search-mock"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/></svg><span>{searchText}</span><i class="caret"></i></div>
      <div class="disc-window">
        <div class="disc-track">
          {#each marqueeResults as result, index (index)}
            <div class="disc-item">
              <img src={img(result.seed, 200, 160)} alt="" loading="lazy" />
              <div><b>{result.title}</b><small>by {result.provider}</small><div class="r">★ {result.rating.toFixed(1)} ({result.ratingCount}) · <b style="display:inline">{result.price}</b></div></div>
            </div>
          {/each}
        </div>
      </div>
    </div>
    <div class="f-text"><h3><span class="dim">{t('f2.a')}</span><br /><Sweep text={t('f2.b')} /></h3></div>
  </div>

  <!-- 3. Secure payment -->
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

  <!-- 4. Orders -->
  <div class="f-row rev" use:inView>
    <div class="f-card grad-4">
      <div class="orders">
        <div class="order"><div><b>Northline Studio</b><small>Landing page design + build · 20 Jul 2026</small></div><div class="o-r"><b>$34,000</b><span><i class="dot amber"></i><em class="tag amber">Held</em><em class="tag blue">New</em></span></div></div>
        <div class="order"><div><b>Elena Rossi</b><small>Logo &amp; brand identity · 21 Jul 2026</small></div><div class="o-r"><b>$18,000</b><span><i class="dot green"></i><em class="tag green">Paid</em><em class="tag amber">In progress</em></span></div></div>
        <div class="order"><div><b>Kite Coffee</b><small>Menu &amp; signage · 24 Jul 2026</small></div><div class="o-r"><b>$9,500</b><span><em class="tag gray">Unpaid</em><em class="tag blue">New</em></span></div></div>
        <div class="order"><div><b>Hannah Kim</b><small>Product photography · 28 Jul 2026</small></div><div class="o-r"><b>$18,000</b><span><em class="tag blue">Delivered</em></span></div></div>
      </div>
      <div class="quote">
        <b>Quotation</b><small>Valid until: 21 Aug 2026</small>
        <div class="q-amt">$12,000</div>
        <b>Social media design pack</b>
        <div class="q-doc"><i></i><i></i><i></i><i></i></div>
      </div>
    </div>
    <div class="f-text"><h3><span class="dim">{t('f4.a')}</span><br /><Sweep text={t('f4.b')} /></h3></div>
  </div>
</section>
