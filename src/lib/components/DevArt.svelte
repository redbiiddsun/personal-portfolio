<!-- Dev artefacts drawn in HTML for the hero collage: illustrative snippets, not real logs or data. -->
<script lang="ts">
  import type { DevArtKind } from '#lib/types.ts';

  let { kind }: { kind: DevArtKind } = $props();

  const SCHEMA_TABLES = [
    { name: 'users', columns: [['id', 'uuid', 'pk'], ['email', 'text', ''], ['created_at', 'timestamptz', '']] },
    { name: 'orders', columns: [['id', 'bigint', 'pk'], ['user_id', 'uuid', 'fk'], ['status', 'text', ''], ['total', 'numeric', '']] },
  ];
</script>

<div class="hc-img dev-art dev-{kind}" aria-hidden="true">
  {#if kind === 'code'}
    <pre><span class="tk-dec">@Controller</span>(<span class="tk-str">'orders'</span>)
<span class="tk-key">export class</span> <span class="tk-type">OrdersController</span> {'{'}
  <span class="tk-key">constructor</span>(<span class="tk-key">private</span> orders: <span class="tk-type">OrdersService</span>) {'{}'}

  <span class="tk-dec">@Get</span>(<span class="tk-str">':id'</span>)
  <span class="tk-fn">findOne</span>(<span class="tk-dec">@Param</span>(<span class="tk-str">'id'</span>) id: <span class="tk-type">string</span>) {'{'}
    <span class="tk-key">return</span> this.orders.<span class="tk-fn">findOne</span>(id);
  {'}'}
{'}'}</pre>
  {:else if kind === 'terminal'}
    <pre><span class="tk-dim">$</span> npm run build
<span class="tk-ok">✓</span> built for production
<span class="tk-dim">$</span> npm test
<span class="tk-ok">✓</span> all tests passed
<span class="tk-dim">$</span> <i class="dev-caret"></i></pre>
  {:else if kind === 'schema'}
    {#each SCHEMA_TABLES as table (table.name)}
      <div class="dev-table">
        <b>{table.name}</b>
        {#each table.columns as [column, type, key] (column)}
          <div class="dev-col"><span class:dev-key={key}>{column}</span><em>{type}</em>{#if key}<i>{key}</i>{/if}</div>
        {/each}
      </div>
    {/each}
  {:else}
    <pre><span class="tk-ok">GET</span> /orders/1042
<span class="tk-dim">200 OK</span>
{'{'}
  <span class="tk-type">"id"</span>: <span class="tk-num">1042</span>,
  <span class="tk-type">"status"</span>: <span class="tk-str">"paid"</span>,
  <span class="tk-type">"items"</span>: <span class="tk-num">3</span>
{'}'}</pre>
  {/if}
</div>
