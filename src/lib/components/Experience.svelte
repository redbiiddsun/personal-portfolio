<!-- Work history as a board of pinned sticky notes. -->
<script lang="ts">
  import { reveal } from '#lib/actions.ts';
  import { experience } from '#lib/data.ts';
  import { t } from '#lib/i18n.svelte.ts';
  import { techIconFor } from '#lib/tech-icons.ts';

  /** Resting tilt per note (deg), cycled so neighbours lean different ways. */
  const NOTE_TILTS = [-2.2, 1.6, -1.1, 2, -1.7, 1.2];
</script>

<section class="experience" id="experience" data-theme="dark">
  <h2 class="h2" use:reveal>{t('experience.title')}</h2>
  <p class="lead" use:reveal>{t('experience.sub')}</p>
  <ol class="xp-board" use:reveal>
    {#each experience as job, index (job.company + job.period)}
      <li class="xp-note" style="--note-color:{job.color};--r:{NOTE_TILTS[index % NOTE_TILTS.length]}deg;--i:{index}">
        <div class="xp-meta">
          <span class="xp-type">{job.employment}</span>
          <span class="xp-period">{job.period}</span>
        </div>
        <h3 class="xp-role">{job.role}</h3>
        <p class="xp-company">{job.company} · {job.location}</p>
        <p class="xp-summary">{job.summary}</p>
        <ul class="xp-stack" aria-label="Tech stack">
          {#each job.stack as tech (tech)}
            {@const icon = techIconFor(tech)}
            {#if icon}
              <li class="xp-logo" title={tech} style:--tile={icon.tile}><svg viewBox="0 0 24 24" fill={icon.color} role="img" aria-label={tech}><path d={icon.path} /></svg></li>
            {:else}
              <li class="xp-chip">{tech}</li>
            {/if}
          {/each}
        </ul>
        <details class="xp-details">
          <summary><span class="xp-open">{t('experience.details')}</span><span class="xp-close">{t('experience.hide')}</span></summary>
          <ul>{#each job.highlights as point (point)}<li>{point}</li>{/each}</ul>
        </details>
        {#if job.links.length}
          <div class="xp-links">
            {#each job.links as link (link.url)}<a href={link.url} target="_blank" rel="noreferrer">{link.label} ↗</a>{/each}
          </div>
        {/if}
      </li>
    {/each}
  </ol>
  <p class="xp-hint">{t('experience.hint')}</p>
</section>
