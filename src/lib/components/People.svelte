<script lang="ts">
  import { reveal } from '#lib/actions.ts';
  import { avatar } from '#lib/data.ts';
  import { t } from '#lib/i18n.svelte.ts';

  const INLINE_AVATAR_PX = 80;
  const inlineAvatarIds = [44, 12, 59];
</script>

<section class="people" id="people" data-theme="light">
  <h2 class="h2" use:reveal>
    <span>{t('people.a')}</span><span class="inline-avatars" aria-hidden="true">{#each inlineAvatarIds as avatarId (avatarId)}<img src={avatar(avatarId, INLINE_AVATAR_PX)} alt="" />{/each}</span><span>{t('people.b')}</span>
  </h2>
  <!-- Trusted static markup from the dictionary (contains a <br>). -->
  <p class="lead" use:reveal>{@html t('people.sub')}</p>
</section>
