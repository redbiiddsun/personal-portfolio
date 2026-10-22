<script lang="ts">
  import { techStack } from '#lib/data.ts';
</script>

<ul class="tech-stack" aria-label="Tech stack">
  {#each techStack as tech (tech.name)}
    <li class="tech-box">
      <svg class="tech-logo" viewBox="0 0 24 24" fill={tech.color} aria-hidden="true"><path d={tech.path} /></svg>
      <span class="tech-label">{tech.name}</span>
    </li>
  {/each}
</ul>
