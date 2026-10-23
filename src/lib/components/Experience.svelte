<!-- Work history as a board of pinned sticky notes. -->
<script lang="ts">
  import { reveal } from '#lib/actions.ts';
  import { experience } from '#lib/data.ts';
  import { locale, localize, t, type DictKey } from '#lib/i18n.svelte.ts';
  import { techIcons } from '#lib/tech-icons.ts';
  import type { Employment, Job } from '#lib/types.ts';
  import BrandIcon from './BrandIcon.svelte';

  /** Resting tilt per note (deg), cycled so neighbours lean different ways. */
  const NOTE_TILTS = [-2.2, 1.6, -1.1, 2, -1.7, 1.2];
  const EMPLOYMENT_KEYS: Record<Employment, DictKey> = {
    fullTime: 'employment.fullTime',
    freelance: 'employment.freelance',
    internship: 'employment.internship',
    projectBased: 'employment.projectBased',
  };
  /** Gregorian calendar in Thai too: a CV reads "2026", not the Buddhist-era "2569". */
  const monthFormat = $derived(new Intl.DateTimeFormat(`${locale.lang}-u-ca-gregory`, { month: 'short', year: 'numeric' }));
  const formatMonth = (month: string) => monthFormat.format(new Date(`${month}-01T00:00:00`));
  const formatPeriod = ({ start, end }: Job['period']) =>
    `${formatMonth(start)} – ${end ? formatMonth(end) : t('experience.present')}`;
</script>

<section class="relative overflow-clip px-4 pt-[150px] pb-[110px] text-on-dark" id="experience" data-theme="dark">
  <h2 class="h2" use:reveal>{t('experience.title')}</h2>
  <p class="lead text-on-dark-2" use:reveal>{t('experience.sub')}</p>
  <ol
    class="mx-auto mt-20 grid max-w-[1200px] grid-cols-3 items-start gap-x-[34px] gap-y-[46px] max-[1080px]:grid-cols-2 max-md:max-w-[460px] max-md:grid-cols-1 max-md:gap-10"
    use:reveal
  >
    {#each experience as job, index (job.company + job.period.start)}
      <li class="xp-note relative bg-(--note-color) px-6 pt-[30px] pb-[22px] text-note-ink" style="--note-color:{job.color};--r:{NOTE_TILTS[index % NOTE_TILTS.length]}deg;--i:{index}">
        <div class="flex items-center justify-between gap-2.5">
          <span class="rounded-full bg-note-ink px-2.5 py-1 text-[11.5px] font-semibold tracking-[.02em] text-(--note-color)">{t(EMPLOYMENT_KEYS[job.employment])}</span>
          <span class="font-hand text-[17px]">{formatPeriod(job.period)}</span>
        </div>
        <h3 class="mt-[18px] mb-0.5 text-[clamp(21px,1.9vw,25px)] leading-[1.15] font-semibold tracking-[-.01em]">{job.role}</h3>
        <p class="font-hand text-[18px] leading-[1.3] opacity-78">{job.company} · {localize(job.location)}</p>
        <p class="mt-3.5 text-[14.5px] leading-[1.5]">{localize(job.summary)}</p>
        <ul class="mt-4 flex flex-wrap items-center gap-1.5" aria-label={t('a11y.techStack')}>
          {#each job.stack as tech (tech)}
            {@const icon = techIcons[tech]}
            <li
              class="grid size-8 place-items-center rounded-[9px] bg-[var(--tile,rgba(255,255,255,.78))] shadow-[0_1px_2px_rgba(35,38,45,.12)]"
              title={tech}
              style:--tile={icon.tile}
            ><BrandIcon {icon} label={tech} class="size-[18px]" /></li>
          {/each}
        </ul>
        {#if job.highlights.length}
          <details class="group mt-4 border-t-[1.5px] border-dashed border-[rgba(35,38,45,.22)] pt-3">
            <summary
              class="w-fit cursor-pointer list-none text-[13px] font-semibold after:content-['_▾'] group-open:after:content-['_▴'] [&::-webkit-details-marker]:hidden"
            ><span class="group-open:hidden">{t('experience.details')}</span><span class="hidden group-open:inline">{t('experience.hide')}</span></summary>
            <ul class="mt-2.5 grid list-disc gap-1.5 pl-[17px] text-[13.5px] leading-[1.5]">{#each job.highlights as point, pointIndex (pointIndex)}<li>{localize(point)}</li>{/each}</ul>
          </details>
        {/if}
        {#if job.links.length}
          <div class="mt-3.5 flex flex-wrap gap-x-3.5 gap-y-1.5 text-[13px] font-semibold">
            {#each job.links as link (link.url)}<a
                class="text-note-ink underline decoration-[1.5px] underline-offset-3 hover:decoration-3"
                href={link.url} target="_blank" rel="noreferrer">{localize(link.label)} ↗</a>{/each}
          </div>
        {/if}
      </li>
    {/each}
  </ol>
  <p class="mt-[50px] text-center font-hand text-[17px] text-on-dark-2">{t('experience.hint')}</p>
</section>
