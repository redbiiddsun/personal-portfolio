<!-- Every call to action opens the visitor's email client addressed to me. -->
<script lang="ts">
  import { MAILTO_HREF } from '#lib/data.ts';
  import { t } from '#lib/i18n.svelte.ts';

  let {
    variant = 'dark',
    isLarge = false,
    id,
  }: {
    variant?: 'dark' | 'light';
    isLarge?: boolean;
    id?: string;
  } = $props();

  const VARIANT_CLASSES = {
    dark: 'bg-dark text-white hover:bg-[#2a3142] hover:shadow-[0_8px_24px_rgba(20,24,33,.25)]',
    light: 'bg-white text-ink hover:shadow-[0_10px_30px_rgba(255,255,255,.18)]',
  };
</script>

<a
  class={[
    'inline-flex items-center justify-center gap-2 rounded-full text-base font-medium whitespace-nowrap no-underline transition-[scale,background-color,box-shadow] duration-250 ease-smooth active:scale-97',
    VARIANT_CLASSES[variant],
    isLarge ? 'px-[26px] py-3.5' : 'px-[22px] py-3',
  ]}
  {id}
  href={MAILTO_HREF}><span>{t('cta')}</span></a
>
