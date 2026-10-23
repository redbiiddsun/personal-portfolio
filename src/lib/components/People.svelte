<script lang="ts">
  import { reveal } from '#lib/actions.ts';
  import { PEOPLE_AVATARS } from '#lib/data.ts';
  import { t } from '#lib/i18n.svelte.ts';
</script>

<section class="px-4 pt-[120px]" id="people" data-theme="light">
  <h2 class="h2 max-w-none whitespace-nowrap max-[600px]:text-[8.4vw]" use:reveal>
    <span>{t('people.a')}</span><span class="mx-[.08em] inline-flex -translate-y-[.06em] align-middle" aria-hidden="true">{#each PEOPLE_AVATARS as avatarSrc (avatarSrc)}<img
        class="-ml-[.22em] size-[.9em] scale-0 rounded-full border-[.06em] border-white object-cover transition-[scale] duration-600 ease-smooth first:ml-0 nth-2:delay-100 nth-3:delay-200 in-[.is-in]:scale-100"
        src={avatarSrc} alt="" />{/each}</span><span>{t('people.b')}</span>
  </h2>
  <p class="lead" use:reveal>{t('people.sub1')}<br />{t('people.sub2')}</p>
</section>
