<script lang="ts">
  import { onMount } from 'svelte';
  import { inView, reveal } from '#lib/actions.ts';
  import { projects, skills, socials } from '#lib/data.ts';
  import { t } from '#lib/i18n.svelte.ts';
  import { techIconFor } from '#lib/tech-icons.ts';
  import { prefersReducedMotion, wait } from '#lib/utils.ts';
  import Sweep from './Sweep.svelte';

  const SEARCH_QUERIES = ['realtime dashboard', 'stripe checkout', 'AI chatbot', 'REST API', 'booking app'];
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

  <!-- 1. Stack marquee: two rows running in opposite directions -->
  <div class="f-row" use:inView>
    <div class="f-card grad-1">
      <div class="stack-marquee">
        {#each stackRows as row, rowIndex (rowIndex)}
          <div class="stack-track">
            {#each row as tech, index (index)}
              {@const icon = techIconFor(tech)}
              <div class="stack-card" aria-hidden={index >= row.length / 2}>
                {#if icon}<span class="stack-logo" style:--tile={icon.tile}><svg viewBox="0 0 24 24" fill={icon.color} aria-hidden="true"><path d={icon.path} /></svg></span>{/if}
                {tech}
              </div>
            {/each}
          </div>
        {/each}
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
              <img src={result.src} alt="" loading="lazy" />
              <div><b>{result.title}</b><small>{result.projectName}{#if result.isDemo} · Demo{/if}</small><div class="r">{result.detail}</div></div>
            </div>
          {/each}
        </div>
      </div>
    </div>
    <div class="f-text"><h3><span class="dim">{t('f2.a')}</span><br /><Sweep text={t('f2.b')} /></h3></div>
  </div>

  <!-- 3. Social links -->
  <div class="f-row" use:inView>
    <div class="f-card grad-3">
      <ul class="socials">
        {#each socials as social (social.url)}
          <li>
            <a class="social" href={social.url} target={social.isExternal ? '_blank' : undefined} rel={social.isExternal ? 'noreferrer' : undefined}>
              <span class="social-logo"><svg viewBox="0 0 24 24" fill={social.icon.color} aria-hidden="true"><path d={social.icon.path} /></svg></span>
              <span class="social-name"><b>{social.label}</b><small>{social.handle}</small></span>
              {#if social.isExternal}<span class="social-go" aria-hidden="true">↗</span><span class="sr-only">({t('social.newTab')})</span>{/if}
            </a>
          </li>
        {/each}
      </ul>
    </div>
    <div class="f-text"><h3><Sweep text={t('f3.a')} /> <span class="dim">{t('f3.b')}</span></h3></div>
  </div>
</section>
