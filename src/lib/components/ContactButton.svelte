<!-- Every call to action opens the visitor's email client addressed to me. -->
<script lang="ts">
  import { MAILTO_HREF } from '#lib/data.ts';
  import { t } from '#lib/i18n.svelte.ts';

  let {
    variant = 'dark',
    isLarge = false,
    extraClass = '',
    id,
  }: {
    variant?: 'dark' | 'light';
    isLarge?: boolean;
    extraClass?: string;
    id?: string;
  } = $props();
</script>

<a class="btn btn-{variant} {extraClass}" class:btn-lg={isLarge} {id} href={MAILTO_HREF}><span>{t('cta')}</span></a>
