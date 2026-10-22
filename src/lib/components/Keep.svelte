<script lang="ts">
  import { reveal } from '#lib/actions.ts';
  import { projects } from '#lib/data.ts';
  import { t } from '#lib/i18n.svelte.ts';
  import { techIconFor, type techIcons } from '#lib/tech-icons.ts';

  type TechKey = keyof typeof techIcons;

  const STACK_LAYERS: { label: string; techs: TechKey[] }[] = [
    { label: 'UI', techs: ['Next.js', 'Svelte'] },
    { label: 'API', techs: ['FastAPI', 'NestJS'] },
    { label: 'Data', techs: ['PostgreSQL', 'Redis'] },
    { label: 'Ship', techs: ['Docker', 'AWS'] },
  ];
  const INCIDENT_STEPS = ['Alert', 'Trace', 'Fix', 'Deploy'];
  const SETUP_SERVICES = ['postgres', 'redis', 'api'];
  // `my-isuzu` is a static entry in `projects`, so the lookup always succeeds.
  const PRODUCTION_PROJECT = projects.find((project) => project.id === 'my-isuzu')!;
  const PRODUCTION_CAPTION = [PRODUCTION_PROJECT.label, ...PRODUCTION_PROJECT.stack.slice(0, 2)].join(' · ');
</script>

<div class="panel panel-light">
  <section class="keep" id="keep" data-theme="light">
    <h2 class="keep-title" use:reveal>
      <span class="muted">{t('keep.a')}</span><br />
      <span class="scribble-wrap"><span>{t('keep.b')}</span>
        <svg class="scribble" viewBox="0 0 120 14" preserveAspectRatio="none" aria-hidden="true"><path d="M3 9c22-4 52-6 114-3" /></svg></span>
    </h2>

    <!-- 1. Whole stack: one person owns every layer -->
    <div class="k-row" use:reveal>
      <div class="k-art art-stack" aria-hidden="true">
        {#each STACK_LAYERS as layer, index (layer.label)}
          <div class="layer" style:--i={index}>
            <span class="layer-label">{layer.label}</span>
            {#each layer.techs as tech (tech)}
              {@const icon = techIconFor(tech)}
              <span class="layer-tech">{#if icon}<svg viewBox="0 0 24 24" fill={icon.color}><path d={icon.path} /></svg>{/if}{tech}</span>
            {/each}
          </div>
        {/each}
      </div>
      <div class="k-text">
        <h3><span>{t('k1.a')}</span> <span class="shine">{t('k1.b')}</span></h3>
        <p>{t('k1.p')}</p>
        <a class="k-link" href="#showcase"><span>{t('k1.link')}</span> <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg></a>
      </div>
    </div>

    <!-- 2. Production: kept a live app running -->
    <div class="k-row" use:reveal>
      <div class="k-art art-prod" aria-hidden="true">
        <div class="prod-app">
          <img src={PRODUCTION_PROJECT.logo} alt="" />
          <div><b>{PRODUCTION_PROJECT.name}</b><small>{PRODUCTION_CAPTION}</small></div>
          <span class="live-dot">Live</span>
        </div>
        <div class="prod-steps">
          {#each INCIDENT_STEPS as step, index (step)}<span class="prod-step" style:--i={index}>{step}</span>{/each}
        </div>
      </div>
      <div class="k-text">
        <h3><span>{t('k2.a')}</span><br /><span class="shine">{t('k2.b')}</span></h3>
        <p>{t('k2.p')}</p>
      </div>
    </div>

    <!-- 3. Developer experience: setup in minutes -->
    <div class="k-row" use:reveal>
      <div class="k-art art-term" aria-hidden="true">
        <div class="term">
          <div class="term-line"><span class="prompt">$</span> docker compose up</div>
          {#each SETUP_SERVICES as service, index (service)}<div class="term-line ok" style:--i={index}>✓ {service} ready</div>{/each}
        </div>
        <div class="term-stat">{t('k3.from')} <span>→</span> {t('k3.to')}</div>
      </div>
      <div class="k-text">
        <h3><span>{t('k3.a')}</span><br /><span class="shine">{t('k3.b')}</span></h3>
        <p>{t('k3.p')}</p>
      </div>
    </div>
  </section>
</div>
