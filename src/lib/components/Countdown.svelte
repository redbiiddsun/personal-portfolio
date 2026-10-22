<script lang="ts">
  import { onMount } from 'svelte';
  import { t, type DictKey } from '#lib/i18n.svelte.ts';
  import FlipNumber from './FlipNumber.svelte';

  const LAUNCH_AT = '2026-11-16T00:00:00+07:00';
  const MS_PER_SECOND = 1000;
  const SECONDS_PER_MINUTE = 60;
  const MINUTES_PER_HOUR = 60;
  const HOURS_PER_DAY = 24;
  const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * MINUTES_PER_HOUR;
  const SECONDS_PER_DAY = SECONDS_PER_HOUR * HOURS_PER_DAY;
  const DAY_MS = SECONDS_PER_DAY * MS_PER_SECOND;
  const ROLLOVER_DAYS = 30;

  let secondsLeft = $state<number>();

  const pad = (value: number) => String(value).padStart(2, '0');
  const units: { labelKey: DictKey; format: (seconds: number) => string }[] = [
    { labelKey: 'cd.d', format: (seconds) => pad(Math.floor(seconds / SECONDS_PER_DAY)) },
    { labelKey: 'cd.h', format: (seconds) => pad(Math.floor(seconds / SECONDS_PER_HOUR) % HOURS_PER_DAY) },
    { labelKey: 'cd.m', format: (seconds) => pad(Math.floor(seconds / SECONDS_PER_MINUTE) % MINUTES_PER_HOUR) },
    { labelKey: 'cd.s', format: (seconds) => pad(seconds % SECONDS_PER_MINUTE) },
  ];

  onMount(() => {
    // Counts down to a fixed launch moment; rolls forward a month once it passes.
    let target = new Date(LAUNCH_AT).getTime();
    if (target < Date.now()) target = Date.now() + ROLLOVER_DAYS * DAY_MS;
    const tick = () => (secondsLeft = Math.floor(Math.max(0, target - Date.now()) / MS_PER_SECOND));
    tick();
    const timer = setInterval(tick, MS_PER_SECOND);
    return () => clearInterval(timer);
  });
</script>

<div class="countdown">
  {#each units as unit (unit.labelKey)}
    <div class="cd-box">
      <FlipNumber value={secondsLeft === undefined ? '' : unit.format(secondsLeft)} />
      <div class="cd-label">{t(unit.labelKey)}</div>
    </div>
  {/each}
</div>
