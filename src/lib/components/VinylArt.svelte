<script lang="ts">
  let { isMini = false }: { isMini?: boolean } = $props();
</script>

<div class="hc-img vinyl-art" class:mini={isMini}><div class="vinyl"><div class="label"></div></div></div>
