<!-- Dev artefacts drawn in HTML for the hero collage: illustrative snippets, not real logs or data. -->
<script lang="ts">
  import type { ClassValue } from 'svelte/elements';
  import type { DevArtKind } from '#lib/types.ts';

  let { kind, class: className }: { kind: DevArtKind; class?: ClassValue } = $props();

  const SCHEMA_TABLES = [
    { name: 'users', columns: [['id', 'uuid', 'pk'], ['email', 'text', ''], ['created_at', 'timestamptz', '']] },
    { name: 'orders', columns: [['id', 'bigint', 'pk'], ['user_id', 'uuid', 'fk'], ['status', 'text', ''], ['total', 'numeric', '']] },
  ];
  const KIND_CLASSES: Record<DevArtKind, string> = {
    code: 'bg-dark text-[#d6dae3]',
    terminal: 'bg-dark text-[#d6dae3]',
    api: 'bg-[#f4f6fb] text-ink',
    schema: 'grid content-center gap-[1.2em] bg-[#eef3ff]',
  };
  /** Syntax colours on the dark cards. */
  const TOKEN = {
    key: 'text-[#c792ea]',
    dec: 'text-[#ffcb6b]',
    str: 'text-[#c3e88d]',
    type: 'text-[#82aaff]',
    fn: 'text-[#89ddff]',
    ok: 'text-[#3ecf8e]',
    dim: 'text-[#8a93a6]',
  };
  /** Darker variants for the light API card. */
  const API_TOKEN = { ...TOKEN, str: 'text-[#2e8b57]', type: 'text-[#3157c8]', num: 'text-[#c2410c]' };
  const SCHEMA_ACCENT = 'text-[#4169e1]';
</script>

<!-- `--dev-text` is overridable by the caller (the intro ring shrinks it). -->
<div
  class={[
    'overflow-hidden px-[1.25em] py-[1.1em] text-left font-mono text-[length:var(--dev-text,calc(8px*var(--k,1)))] leading-[1.5] font-medium *:[font:inherit]',
    KIND_CLASSES[kind],
    className,
  ]}
  aria-hidden="true"
>
  {#if kind === 'code'}
    <pre class="whitespace-pre"><span class={TOKEN.dec}>@Controller</span>(<span class={TOKEN.str}>'orders'</span>)
<span class={TOKEN.key}>export class</span> <span class={TOKEN.type}>OrdersController</span> {'{'}
  <span class={TOKEN.key}>constructor</span>(<span class={TOKEN.key}>private</span> orders: <span class={TOKEN.type}>OrdersService</span>) {'{}'}

  <span class={TOKEN.dec}>@Get</span>(<span class={TOKEN.str}>':id'</span>)
  <span class={TOKEN.fn}>findOne</span>(<span class={TOKEN.dec}>@Param</span>(<span class={TOKEN.str}>'id'</span>) id: <span class={TOKEN.type}>string</span>) {'{'}
    <span class={TOKEN.key}>return</span> this.orders.<span class={TOKEN.fn}>findOne</span>(id);
  {'}'}
{'}'}</pre>
  {:else if kind === 'terminal'}
    <pre class="whitespace-pre"><span class={TOKEN.dim}>$</span> npm run build
<span class={TOKEN.ok}>✓</span> built for production
<span class={TOKEN.dim}>$</span> npm test
<span class={TOKEN.ok}>✓</span> all tests passed
<span class={TOKEN.dim}>$</span> <i class="inline-block h-[1.1em] w-[.6em] animate-blink bg-current align-text-bottom"></i></pre>
  {:else if kind === 'schema'}
    {#each SCHEMA_TABLES as table (table.name)}
      <div class="overflow-hidden rounded-md bg-paper shadow-[0_1px_3px_rgba(20,24,33,.12)]">
        <b class="block bg-[#4169e1] px-[.9em] py-[.5em] font-semibold text-white">{table.name}</b>
        {#each table.columns as [column, type, key] (column)}
          <div class="flex gap-[.75em] border-t border-[#eef0f4] px-[.9em] py-[.25em]">
            <span class={[key && 'font-semibold']}>{column}</span><em class="ml-auto text-ink-3 not-italic">{type}</em>{#if key}<i class="font-semibold not-italic {SCHEMA_ACCENT}">{key}</i>{/if}
          </div>
        {/each}
      </div>
    {/each}
  {:else}
    <pre class="whitespace-pre"><span class={API_TOKEN.ok}>GET</span> /orders/1042
<span class={API_TOKEN.dim}>200 OK</span>
{'{'}
  <span class={API_TOKEN.type}>"id"</span>: <span class={API_TOKEN.num}>1042</span>,
  <span class={API_TOKEN.type}>"status"</span>: <span class={API_TOKEN.str}>"paid"</span>,
  <span class={API_TOKEN.type}>"items"</span>: <span class={API_TOKEN.num}>3</span>
{'}'}</pre>
  {/if}
</div>
