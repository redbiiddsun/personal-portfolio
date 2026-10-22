<!-- Every call to action opens the visitor's email client addressed to me. -->
<script lang="ts">
  import type { Action } from 'svelte/action';
  import { MAILTO_HREF } from '#lib/data.ts';
  import { t } from '#lib/i18n.svelte.ts';

  let {
    variant = 'dark',
    isLarge = false,
    extraClass = '',
    id,
    action = () => {},
  }: {
    variant?: 'dark' | 'light';
    isLarge?: boolean;
    extraClass?: string;
    id?: string;
    /** Optional element action, e.g. `reveal`, since actions can't be passed via `use:` on a component. */
    action?: Action<HTMLElement>;
  } = $props();
</script>

<a class="btn btn-{variant} {extraClass}" class:btn-lg={isLarge} {id} href={MAILTO_HREF} use:action><span>{t('cta')}</span></a>
