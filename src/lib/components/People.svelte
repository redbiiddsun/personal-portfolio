<script lang="ts">
  import { reveal } from '#lib/actions.ts';
  import { avatar } from '#lib/data.ts';
  import { t } from '#lib/i18n.svelte.ts';

  const INLINE_AVATAR_PX = 80;
  const inlineAvatarIds = [44, 12, 59];
</script>

<section class="px-4 pt-[120px]" id="people" data-theme="light">
  <h2 class="h2 max-w-none whitespace-nowrap max-[600px]:text-[8.4vw]" use:reveal>
    <span>{t('people.a')}</span><span class="mx-[.08em] inline-flex -translate-y-[.06em] align-middle" aria-hidden="true">{#each inlineAvatarIds as avatarId (avatarId)}<img
        class="-ml-[.22em] size-[.9em] scale-0 rounded-full border-[.06em] border-white object-cover transition-[scale] duration-600 ease-smooth first:ml-0 nth-2:delay-100 nth-3:delay-200 in-[.is-in]:scale-100"
        src={avatar(avatarId, INLINE_AVATAR_PX)} alt="" />{/each}</span><span>{t('people.b')}</span>
  </h2>
  <!-- Trusted static markup from the dictionary (contains a <br>). -->
  <p class="lead" use:reveal>{@html t('people.sub')}</p>
</section>
