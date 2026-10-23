<script lang="ts">
  import { heroTech } from '#lib/data.ts';
  import { t } from '#lib/i18n.svelte.ts';
  import { techIcons } from '#lib/tech-icons.ts';
  import BrandIcon from './BrandIcon.svelte';
</script>

<ul class="mb-10 flex justify-center gap-2.5 max-md:gap-1.5" aria-label={t('a11y.techStack')}>
  {#each heroTech as tech (tech)}
    <li class="grid w-[clamp(70px,8.6vw,118px)] justify-items-center rounded-2xl bg-soft pt-[18px] pb-3.5">
      <BrandIcon icon={techIcons[tech]} class="size-[clamp(26px,2.6vw,38px)]" />
      <span class="mt-2 text-[13px] text-ink-2">{tech}</span>
    </li>
  {/each}
</ul>
