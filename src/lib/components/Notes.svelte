<script lang="ts">
  import { reveal } from '#lib/actions.ts';
  import { notes } from '#lib/data.ts';
  import { locale, t } from '#lib/i18n.svelte.ts';

  /** Notes stay put on narrow screens, where dragging would fight page scroll. */
  const DRAG_DISABLED_QUERY = '(max-width: 768px)';
  const BASE_Z_INDEX = 10;

  type DragState = { dx: number; dy: number; zIndex?: number; isDragging: boolean; wasMoved: boolean };

  const drags: DragState[] = $state(notes.map(() => ({ dx: 0, dy: 0, isDragging: false, wasMoved: false })));
  let topZIndex = BASE_Z_INDEX;
  let pointerStart = { x: 0, y: 0, dx: 0, dy: 0 };

  const startDrag = (event: PointerEvent, drag: DragState) => {
    if (matchMedia(DRAG_DISABLED_QUERY).matches) return;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    drag.isDragging = true;
    drag.zIndex = ++topZIndex;
    pointerStart = { x: event.clientX, y: event.clientY, dx: drag.dx, dy: drag.dy };
  };

  const moveDrag = (event: PointerEvent, drag: DragState) => {
    if (!drag.isDragging) return;
    drag.dx = pointerStart.dx + event.clientX - pointerStart.x;
    drag.dy = pointerStart.dy + event.clientY - pointerStart.y;
  };

  const endDrag = (drag: DragState) => {
    drag.isDragging = false;
    drag.wasMoved = true;
  };
</script>

<section class="notes" id="notes" data-theme="dark">
  <h2 class="h2" use:reveal>{t('notes.title')}</h2>
  <p class="lead" use:reveal>{t('notes.sub')}</p>
  <div class="notes-board" use:reveal>
    {#each notes as note, index (index)}
      {@const drag = drags[index]}
      <div
        class="note"
        class:dragging={drag.isDragging}
        role="presentation"
        style="left:{note.leftPercent}%;top:{note.topPx}px;background:{note.color};--r:{note.rotation}deg;--i:{index}"
        style:--dx="{drag.dx}px"
        style:--dy="{drag.dy}px"
        style:z-index={drag.zIndex}
        style:transition-delay={drag.wasMoved ? '0ms' : undefined}
        onpointerdown={(event) => startDrag(event, drag)}
        onpointermove={(event) => moveDrag(event, drag)}
        onpointerup={() => endDrag(drag)}
        onpointercancel={() => endDrag(drag)}
      >
        {note.text[locale.lang]}
      </div>
    {/each}
  </div>
  <p class="notes-hint">{t('notes.hint')}</p>
</section>
