<script lang="ts">
  import { reveal } from '#lib/actions.ts';
  import { incidentSteps, productionProject, setupServices, stackLayers } from '#lib/data.ts';
  import { localize, t } from '#lib/i18n.svelte.ts';
  import { techIcons } from '#lib/tech-icons.ts';
  import BrandIcon from './BrandIcon.svelte';
  import Scribble from './Scribble.svelte';

  const productionCaption = $derived([localize(productionProject.label), ...productionProject.stack.slice(0, 2)].join(' · '));

  const ROW_CLASS = 'grid grid-cols-[1fr_1.25fr] items-center gap-[60px] max-[900px]:grid-cols-1 max-[900px]:gap-2.5';
  const ART_CLASS = 'relative min-h-[220px] max-[900px]:min-h-[200px]';
  /** Rows after the first get a divider above their text (desktop only). */
  const TEXT_CLASS = 'py-14';
  const DIVIDED_TEXT_CLASS = `${TEXT_CLASS} border-t border-line max-[900px]:border-t-0`;
  const HEADING_CLASS = 'mb-[22px] text-[clamp(26px,2.6vw,36px)] leading-[1.2] font-semibold tracking-[-.015em]';
  const BODY_CLASS = 'mb-[22px] text-[17px] leading-[1.65] text-ink-2';
</script>

<div class="relative z-2 overflow-clip rounded-panel bg-paper">
  <section class="mx-auto max-w-[1180px] px-6 pt-[140px] pb-[120px]" id="keep" data-theme="light">
    <h2 class="mb-[120px] text-center text-[clamp(32px,4.4vw,58px)] leading-[1.15] font-semibold tracking-[-.02em] max-md:mb-[60px]" use:reveal>
      <span class="font-medium text-ink-mute">{t('keep.a')}</span><br />
      <span class="relative inline-block"><span>{t('keep.b')}</span>
        <Scribble class="w-[28%] stroke-ink" /></span>
    </h2>

    <!-- 1. Whole stack: one person owns every layer -->
    <div class={ROW_CLASS} use:reveal>
      <div class="{ART_CLASS} flex flex-col gap-2.5" aria-hidden="true">
        {#each stackLayers as layer, index (index)}
          <div
            class="flex -translate-x-4 flex-wrap items-center gap-2 rounded-[14px] border border-line bg-white px-3.5 py-2.5 opacity-0 transition-[opacity,translate] delay-[calc(var(--i)*140ms+.2s)] duration-600 ease-smooth in-[.is-in]:translate-x-0 in-[.is-in]:opacity-100"
            style:--i={index}
          >
            <span class="min-w-11 text-xs font-semibold tracking-[.06em] text-ink-3 uppercase">{localize(layer.label)}</span>
            {#each layer.techs as tech (tech)}
              <span class="inline-flex items-center gap-1.5 rounded-full bg-soft px-2.5 py-[5px] text-sm"><BrandIcon icon={techIcons[tech]} class="size-4" />{tech}</span>
            {/each}
          </div>
        {/each}
      </div>
      <div class={TEXT_CLASS}>
        <h3 class={HEADING_CLASS}><span>{t('k1.a')}</span> <span class="shine">{t('k1.b')}</span></h3>
        <p class={BODY_CLASS}>{t('k1.p')}</p>
        <a class="group inline-flex items-center gap-1.5 text-[15px] font-semibold" href="#showcase"
          ><span>{t('k1.link')}</span>
          <svg class="size-4 fill-none stroke-current stroke-2 transition-[translate] duration-300 ease-smooth group-hover:translate-x-[3px]" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg></a>
      </div>
    </div>

    <!-- 2. Production: kept a live app running -->
    <div class={ROW_CLASS} use:reveal>
      <div class="{ART_CLASS} flex flex-col justify-center gap-[18px]" aria-hidden="true">
        <div class="flex items-center gap-3 rounded-[18px] border border-line bg-white px-4 py-3.5">
          <img class="size-11 rounded-[10px]" src={productionProject.logo} alt="" />
          <div><b>{productionProject.name}</b><small class="block text-[13px] text-ink-2">{productionCaption}</small></div>
          <span class="ml-auto rounded-full bg-ok-bg px-2.5 py-1 text-xs font-semibold text-ok">{t('badge.live')}</span>
        </div>
        <div class="flex flex-wrap gap-2">
          {#each incidentSteps as step, index (index)}<span
              class={[
                'translate-y-2 rounded-full px-3 py-[7px] text-[13px] opacity-0 transition-[opacity,translate] delay-[calc(var(--i)*250ms+.3s)] duration-500 ease-smooth in-[.is-in]:translate-y-0 in-[.is-in]:opacity-100',
                index === incidentSteps.length - 1 ? 'bg-ok-bg text-ok' : 'bg-warn-bg text-warn',
              ]}
              style:--i={index}>{localize(step)}</span
            >{/each}
        </div>
      </div>
      <div class={DIVIDED_TEXT_CLASS}>
        <h3 class={HEADING_CLASS}><span>{t('k2.a')}</span><br /><span class="shine">{t('k2.b')}</span></h3>
        <p class={BODY_CLASS}>{t('k2.p')}</p>
      </div>
    </div>

    <!-- 3. Developer experience: setup in minutes -->
    <div class={ROW_CLASS} use:reveal>
      <div class="{ART_CLASS} flex flex-col justify-center gap-4" aria-hidden="true">
        <div class="rounded-2xl bg-ink px-5 py-[18px] font-mono text-sm leading-[1.8] text-[#e6e8ec]">
          <div><span class="text-ink-mute">$</span> docker compose up</div>
          {#each setupServices as service, index (service)}<div
              class="text-[#7ee2a0] opacity-0 transition-opacity delay-[calc(var(--i)*300ms+.4s)] duration-300 in-[.is-in]:opacity-100"
              style:--i={index}
            >✓ {service} ready</div>{/each}
        </div>
        <div
          class="-rotate-3 scale-90 font-script text-[44px] leading-none opacity-0 transition-[opacity,scale] delay-1500 duration-600 ease-smooth in-[.is-in]:scale-100 in-[.is-in]:opacity-100"
        >
          {t('k3.from')} <span class="text-blue">→</span> {t('k3.to')}</div>
      </div>
      <div class={DIVIDED_TEXT_CLASS}>
        <h3 class={HEADING_CLASS}><span>{t('k3.a')}</span><br /><span class="shine">{t('k3.b')}</span></h3>
        <p class={BODY_CLASS}>{t('k3.p')}</p>
      </div>
    </div>
  </section>
</div>
