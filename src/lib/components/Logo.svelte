<script lang="ts">
    import type { ClassValue } from "svelte/elements";
    import { LOGO_SRC, OWNER } from "#lib/data.ts";
    import { t } from "#lib/i18n.svelte.ts";

    let { class: className }: { class?: ClassValue } = $props();
</script>

<a
    class={[
        "inline-flex items-center gap-[7px] rounded-full font-semibold tracking-[-.02em] no-underline transition-[background-color] duration-400",
        className,
    ]}
    href="#top"
    aria-label="{OWNER.nickname} ({OWNER.name}), {t('a11y.home')}"
>
    <img class="size-7.5" src={LOGO_SRC} alt="" width="30" height="30" />
    <span>{OWNER.nickname}</span>
</a>
