<script lang="ts">
  import { techStack } from '#lib/data.ts';
</script>

<ul class="mb-10 flex justify-center gap-2.5 max-md:gap-1.5" aria-label="Tech stack">
  {#each techStack as tech (tech.name)}
    <li class="grid w-[clamp(70px,8.6vw,118px)] justify-items-center rounded-2xl bg-soft pt-[18px] pb-3.5">
      <svg class="size-[clamp(26px,2.6vw,38px)]" viewBox="0 0 24 24" fill={tech.color} aria-hidden="true"><path d={tech.path} /></svg>
      <span class="mt-2 text-[13px] text-ink-2">{tech.name}</span>
    </li>
  {/each}
</ul>
